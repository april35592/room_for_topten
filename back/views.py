from models import mongodb
import datetime
import random


class Views:

    async def make_room(self, games: list, order: int):
        game = []
        for num in games:
            game.append(num[order])
        return game

    async def create_room(self, user_number: int):
        # id 생성
        newIDli = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                   ]
        id = ''
        while True:
            id = ''.join(random.sample(newIDli, 4))
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
        room = dict(
            id=id,
            user_number=user_number,
            last_edit=datetime.datetime.now(),
            games=games
        )
        mongodb.db.room.insert_one(room)

        # user와 memo를 생성
        for i in range(user_number):
            user_id = id + '_' + str(i)
            user = dict(
                room_id=id,
                id=user_id,
                order=i,
                username='',
                question=''
            )
            mongodb.db.user.insert_one(user)

            for j in range(user_number):
                memo = dict(
                    room_id=id,
                    user_id=user_id,
                    id=user_id + '_' + str(j),
                    answer=''
                )
                mongodb.db.memo.insert_one(memo)
        return [id, f'{id}_0', games]

    async def join_room(self, room_id: str, order: int):
        result = mongodb.db.room.find_one({"id": room_id})
        if result:
            return [f'{id}_{order}', result['games']]
        else:
            return None

    async def delete_room(self, room_id: str):
        mongodb.db.room.delete_one({'id': room_id})
        mongodb.db.user.delete_many({'room_id': room_id})
        mongodb.db.memo.delete_many({'room_id': room_id})
        mongodb.db.chat.delete_many({'room_id': room_id})

    async def check_lastedit(self, room_id: str, last_edit: datetime):
        room = mongodb.db.room.find_one({"id": room_id})
        if last_edit == room['last_edit']:
            return False
        else:
            return True

    async def load_lastedit(self, room_id, before_edit):
        last_edit = mongodb.db.room.find_one({'id': room_id})['last_edit']
        user = list(mongodb.db.user.find(
            {'room_id': room_id}, {'_id': 0, 'id': 1, 'username': 1, 'question': 1}))
        memo = list(mongodb.db.memo.find({'room_id': room_id}, {
            '_id': 0, 'id': 1, 'answer': 1}))
        chat = list(mongodb.db.chat.find(
            {'room_id': room_id, 'create_at': {'$gt': before_edit}}, {'_id': 0, 'user_id': 1, 'create_at': 1, 'text': 1}))
        return {'last_edit': last_edit, 'user': user, 'memo': memo, 'chat': chat}

    async def edit_username(self, user_id: str, username: str):
        mongodb.db.user.update_one(
            {'id': user_id}, {'$set': {'username': username}})

    async def edit_question(self, user_id: str, question: str):
        mongodb.db.user.update_one(
            {'id': user_id}, {'$set': {'question': question}})

    async def edit_answer(self, memo_id: str, answer: str):
        mongodb.db.memo.update_one(
            {'id': memo_id}, {'$set': {'answer': answer}})
        mongodb.db.room.update_one({'id': memo_id[0:4]}, {
                                   '$set': {'last_edit': datetime.datetime.now()}})

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
        mongodb.db.room.update_one({'id': room_id}, {
                                   '$set': {'last_edit': now}})
