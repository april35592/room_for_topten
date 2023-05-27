from models import mongodb
import datetime
import random


def your_number(games, order):
    number = []
    for game in games:
        number.append(game[order])
    return number


class Routes:

    async def create_room(user_number):
        newIDli = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                   ]
        while True:
            id = ''.join([random.choice(newIDli) for i in range(3)])
            room = await mongodb.client.TOPTEN.Room.find_one({"id" == id})
            if not room:
                break
        games = []
        for i in range(user_number):
            game = random.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            games.append(game)
        room = dict(
            id=id,
            user_number=user_number,
            last_edit=datetime.datetime.now(),
            games=games
        )
        await mongodb.engine.save(room)
        num = your_number(games, 1)
        return num

    async def join_room(room_id, order):
        result = await mongodb.client.TOPTEN.Room.find_one({"id": room_id})
        if result:
            num = your_number(result.games, order)
            return num
        else:
            return None

    async def check_lastedit(room_id, last_edit):
        room = await mongodb.client.TOPTEN.Room.find_out({"id": room_id})
        if last_edit == room.last_edit:
            return False
        else:
            return True
