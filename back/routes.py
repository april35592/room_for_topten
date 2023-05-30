from models import mongodb
import datetime
import random


class Routes:

    async def create_room(self, user_number):
        newIDli = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                   ]
        id = ''
        while True:
            id = ''.join(random.sample(newIDli, 4))
            room = mongodb.db.room.find_one({"id": id})
            if not room:
                break
        games = []
        card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for i in range(user_number):
            random.shuffle(card)
            games.append(card.copy())
        room = dict(
            id=id,
            user_number=user_number,
            last_edit=datetime.datetime.now(),
            games=games
        )
        mongodb.db.room.insert_one(room)
        number = []
        for game in games:
            number.append(game[0])
        return number

    async def join_room(self, room_id, order):
        result = mongodb.db.room.find_one({"id": room_id})
        if result:
            number = []
            for game in result['games']:
                number.append(game[order])
            print(number)
            return number
        else:
            return None

    async def check_lastedit(self, room_id, last_edit):
        room = mongodb.db.room.find_one({"id": room_id})
        if last_edit == room['last_edit']:
            return False
        else:
            return True
