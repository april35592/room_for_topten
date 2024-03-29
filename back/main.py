from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

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
async def websocket_endpoint(websocket: WebSocket, room_id: str, order: Optional[int] = -1):
    try:
        games = mongodb.db.room.find_one(
            {"id": room_id}, {"_id": 0, "id": 1, "user_number": 1})
        user_id = ''
        if (len(games) < 1):
            raise HTTPException(status_code=404, detail="not found page")

        user = manager.current(room_id)
        print(room_id + ': ' + str(user))
        if (order == -1):
            if len(user) >= int(games["user_number"]):
                raise HTTPException(status_code=403, detail="too many users")
            for index in range(int(games["user_number"])):
                if index not in user:
                    user_id = f"{room_id}_{index}"
                    order = index
                    break

        else:
            user_id = f"{room_id}_{order}"

        print(f"ws연결중 : {user_id}")
        await manager.connect(websocket, games, order)
        try:
            await websocket.receive_text()
            print(f"ws연결완료 : {user_id}")
            await manager.personal_message(websocket, f"myID : {user_id}")
            await manager.broadcast(room_id, f"entry: {user_id}님이 들어왔습니다.")
            if (user_id != ''):
                while True:
                    data = await websocket.receive_text()
                    await manager.broadcast(room_id, f"chat : {user_id} : {data}")
                    await views.chat(user_id, data)

        except WebSocketDisconnect:
            print(f"exit : {user_id}")
            await manager.disconnect(websocket, room_id)
            await manager.broadcast(room_id, f"exit : {user_id}님이 나가셨습니다.")

    except HTTPException:
        return 'error'


@app.post("/{user_number}")
async def create_room(user_number: int):
    if (2 < user_number < 10):
        [room_id, user_id, games] = await views.create_room(user_number)
        game = await views.make_room(games, 0)
        return {"room_id": room_id, "user_id": user_id, "game": game}
    else:
        raise HTTPException(status_code=406, detail="out of range")


@app.get("/{room_id}/{user_id}")
async def join_room(room_id: str, user_id: str):
    order = int(user_id[5])
    try:
        games = await views.join_room(room_id)
        game = await views.make_room(games, order)
        return {"room_id": room_id, "user_id": user_id, "game": game}
    except:
        raise HTTPException(status_code=404, detail="Room not found")


@app.get("room/{room_id}")
async def load_room(room_id: str):
    return await views.load_room(room_id)


@app.patch("/username/{user_id}")
async def edit_username(user_id: str, username: str):
    await views.edit_username(user_id, username)
    manager.broadcast(
        user_id[0:4], f"chg  : {user_id}의 username : {username}")


@app.patch("/question/{user_id}")
async def edit_question(user_id: str, question: str):
    await views.edit_question(user_id, question)
    manager.broadcast(
        user_id[0, 4], f"chg  : {user_id}의 question : {question}")


@app.patch("/answer/{memo_id}")
async def edit_answer(memo_id: str, answer: str):
    await views.edit_answer(memo_id, answer)
    manager.broadcast(
        memo_id[0, 4], f"chg  : {memo_id[0,6]}의 {int(memo_id[8])+1}번째 게임 answer : {answer}")


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
