from fastapi import FastAPI, Form, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocketDisconnect

from views import Views, ConnectionManager
from models import mongodb

app = FastAPI()
views = Views()
manager = ConnectionManager()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.websocket("/manager/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    games = await mongodb.db.room.find_one({"id": room_id}, {"_id": 0, "id": 1, "user_number": 1, "games": 1})
    room_id = games.id
    user_id = await manager.connect(websocket, games)
    manager.broadcast(room_id, f"entry: {user_id}")
    try:
        while True:
            data = await websocket.receive_text()
            manager.broadcast(room_id, f"chat : {data}")
            views.chat(user_id, data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        manager.broadcast(room_id, f"exit : {user_id}")


@app.post("/{user_number}")
async def create_room(user_number: int):
    if (2 < user_number < 10):
        [room_id, user_id, games] = await views.create_room(user_number)
        game = await views.make_room(games, 0)
        return {"user_id": user_id, "room_id": room_id, "game": game}
    else:
        raise HTTPException(status_code=400, detail="out of range")


@app.get("/{room_id}/{order}")
async def join_room(room_id: str, order: int):
    order -= 1
    try:
        [user_id, games] = await views.join_room(room_id, order)
        game = await views.make_room(games, order)
        return {"user_id": user_id, "room_id": room_id, "game": game}
    except:
        raise HTTPException(status_code=404, detail="Room not found")


@app.patch("/username/{user_id}")
async def edit_username(user_id: str, username: str = Form()):
    await views.edit_username(user_id, username)
    manager.broadcast(user_id[0, 4], f"{user_id}'s username : {username}")


@app.patch("/question/{user_id}")
async def edit_question(user_id: str, question: str = Form()):
    await views.edit_question(user_id, question)
    manager.broadcast(user_id[0, 4], f"{user_id}'s question : {question}")


@app.patch("/answer/{memo_id}")
async def edit_answer(memo_id: str, answer: str = Form()):
    await views.edit_answer(memo_id, answer)
    manager.broadcast(memo_id[0, 4], f"{memo_id[0,6]}'s answer : {answer}")


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
