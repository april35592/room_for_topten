from fastapi import WebSocket
from models import mongodb
import datetime
import time
import random


class Views:

    async def make_room(self, games: list, order: int):
        game = []
        for arr in games:
            game.append(arr[order])
        return game

    async def create_room(self, user_number: int):
        # id 생성
        newIDli = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
                   ]
        id = ""
        while True:
            id = "".join(random.sample(newIDli, 4))
            room = mongodb.db.room.find_one({"id": id})
            if not room:
                break

        # games 생성
        games = []
        card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for i in range(user_number):
            random.shuffle(card)
            games.append(card.copy())

        # room 생성
        now = datetime.datetime.now()
        room = dict(
            id=id,
            user_number=user_number,
            first_edit=now,
            last_edit=now,
            games=games
        )
        mongodb.db.room.insert_one(room)

        # user 생성
        for i in range(user_number):
            user_id = id + "_" + str(i)
            user = dict(
                room_id=id,
                id=user_id,
                order=i,
                username="",
                question=""
            )
            mongodb.db.user.insert_one(user)

            # memo 생성
            for j in range(user_number):
                memo = dict(
                    room_id=id,
                    user_id=user_id,
                    id=user_id + "_" + str(j),
                    answer=""
                )
                mongodb.db.memo.insert_one(memo)
        return [id, f"{id}_0", games]

    async def join_room(self, room_id: str):
        result = mongodb.db.room.find_one(
            {"id": room_id}, {"_id": 0, "games": 1})["games"]
        if len(result) > 0:
            return result
        else:
            return None

    async def load_lastedit(self, room_id, before_edit):
        last_edit = mongodb.db.room.find_one({"id": room_id})["last_edit"]
        user = list(mongodb.db.user.find(
            {"room_id": room_id}, {"_id": 0, "id": 1, "username": 1, "question": 1}))
        memo = list(mongodb.db.memo.find({"room_id": room_id}, {
            "_id": 0, "id": 1, "answer": 1}))
        chat = list(mongodb.db.chat.find(
            {"room_id": room_id, "create_at": {"$gt": before_edit}}, {"_id": 0, "user_id": 1, "create_at": 1, "text": 1}))
        return {"last_edit": last_edit, "user": user, "memo": memo, "chat": chat}

    async def edit_username(self, user_id: str, username: str):
        mongodb.db.user.update_one(
            {"id": user_id}, {"$set": {"username": username}})

    async def edit_question(self, user_id: str, question: str):
        mongodb.db.user.update_one(
            {"id": user_id}, {"$set": {"question": question}})

    async def edit_answer(self, memo_id: str, answer: str):
        mongodb.db.memo.update_one(
            {"id": memo_id}, {"$set": {"answer": answer}})
        mongodb.db.room.update_one({"id": memo_id[0:4]}, {
                                   "$set": {"last_edit": datetime.datetime.now()}})

    async def chat(self, user_id: str, chat: str):
        now = datetime.datetime.now()
        room_id = user_id[0:4]
        chat = dict(
            room_id=room_id,
            user_id=user_id,
            create_at=now,
            text=chat
        )
        mongodb.db.chat.insert_one(chat)
        mongodb.db.room.update_one({"id": room_id}, {
                                   "$set": {"last_edit": now}})


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[dict[WebSocket]] = dict()
        self.delete_timer: dict[object] = dict()

    async def connect(self, websocket: WebSocket, games: dict, order: int):
        room_id = games["id"]
        if room_id not in self.active_connections:
            self.active_connections[room_id] = {}
        if len(self.active_connections[room_id]) > int(games["user_number"]):
            return "Too many client"
        for index in range(int(games["user_number"])):
            if index not in self.active_connections[room_id]:
                self.active_connections[room_id][index] = websocket
                if room_id in self.delete_timer:  # 삭제 예정이었던 방의 경우 delete room counter 초기화
                    del self.delete_timer[room_id]
                print('ws연결중')
                await websocket.accept()
                print('ws연결성공')
                return f'{room_id}_{index}'

    def disconnect(self, websocket: WebSocket, room_id: str):
        for key in self.active_connections[room_id]:
            if self.active_connections[room_id][key] == websocket:
                del self.active_connections[room_id][key]
        # 접속자 0명 시 delete room counter 시작
        if self.active_connections[room_id].len() == 0:
            del self.active_connections[room_id]
            self.delete_timer[room_id] = datetime.datetime.now(
            ) + datetime.timedelta(hours=1)

    async def check_del_room(self):
        while True:
            await time.sleep(600)
            for room_id in self.delete_timer:
                if self.delete_timer[room_id] < datetime.datetime.now():
                    await self.del_room(room_id)
                    del self.delete_timer[room_id]

    async def del_room(room_id):
        games = await mongodb.db.room.find_one({"id": room_id}, {"_id": 0, "first_edit": 1, "last_edit": 1, "games": 1})
        user = await mongodb.db.user.find({"room_id": room_id}, {"_id": 0, "id": 1, "username": 1, "question": 1})
        memo = await mongodb.db.memo.find({"room_id": room_id}, {"_id": 0, "id": 1, "answer": 1})
        chat = await mongodb.db.chat.find({"room_id": room_id}, {"_id": 0, "user_id": 1, "create_at": 1, "text": 1})
        await mongodb.db.room.insert_one(
            dict(
                id=room_id,
                first_edit=games["first_edit"],
                last_edit=games["last_edit"],
                games=games["games"],
                users=user,
                memo=memo,
                chat=chat
            )
        )
        mongodb.db.room.delete_one({"id": room_id})
        mongodb.db.user.delete_many({"room_id": room_id})
        mongodb.db.memo.delete_many({"room_id": room_id})
        mongodb.db.chat.delete_many({"room_id": room_id})

    async def broadcast(self, room_id: str, message: str):
        for connection in self.active_connections[room_id]:
            await self.active_connections[room_id][connection].send_text(message)

    async def personal_message(self, websocket: WebSocket, message: str):
        await websocket.send_text(message)
