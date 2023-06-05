from fastapi import FastAPI, Form, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocketDisconnect

from views import Views
from models import mongodb

import datetime

app = FastAPI()
views = Views()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list = []

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        user = {websocket: websocket, user: user_id}
        self.active_connections.append(user)

    async def disconnect(self, websocket: WebSocket):
        user = filter(lambda item: item.websocket ==
                      websocket, self.active_connections)
        self.active_connections.remove(user)

    async def self_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, user_id: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    await manager.broadcast(f"hello : {user_id}", user_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.self_message(f"{user_id} : {data}", websocket)
            await manager.broadcast(f"{user_id} : {data}", user_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"bye : {user_id}")


@app.post("/{user_number}")
async def create_room(user_number: int):
    if (2 < user_number < 10):
        [room_id, user_id, games] = await views.create_room(user_number)
        game = await views.make_room(games, 0)
        return {'user_id': user_id, 'room_id': room_id, 'game': game}
    else:
        raise HTTPException(status_code=400, detail='out of range')


@app.get("/{room_id}/{order}")
async def join_room(room_id: str, order: int):
    order -= 1
    try:
        [user_id, games] = await views.join_room(room_id, order)
        game = await views.make_room(games, order)
        return {'user_id': user_id, 'room_id': room_id, 'game': game}
    except:
        raise HTTPException(status_code=404, detail="Room not found")


@app.get("/{room_id}/{before_edit}")
async def check_lastedit(room_id: str, before_edit: str):
    datetime_format = "%Y-%m-%dT%H:%M:%S.%f+00:00"
    before_edit = datetime.datetime.strptime(before_edit, datetime_format)
    result = await views.check_lastedit(room_id, before_edit)
    if result:
        update = await views.load_lastedit(room_id, before_edit)
        return update
    else:
        return None


@app.delete("/{room_id}")
async def delete_room(room_id: str):
    await views.delete_room(room_id)
    return (f'{room_id}가 모두 제거되었습니다')


@app.patch("/username/{user_id}")
async def edit_username(user_id: str, username: str = Form()):
    await views.edit_username(user_id, username)


@app.patch("/question/{user_id}")
async def edit_question(user_id: str, question: str = Form()):
    await views.edit_question(user_id, question)


@app.patch("/answer/{memo_id}")
async def edit_answer(memo_id: str, answer: str = Form()):
    await views.edit_answer(memo_id, answer)


@app.post("/chat/{user_id}")
async def chat(user_id: str, chat: str = Form()):
    await views.chat(user_id, chat)


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
