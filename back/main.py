from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from routes import Routes
from models import mongodb
import datetime

app = FastAPI()
routes = Routes()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/create/{user_number}")
async def create_room(user_number: int):
    if (2 < user_number < 10):
        [room_id, user_id, games] = await routes.create_room(user_number)
        game = await routes.make_room(games, 0)
        return {'user_id': user_id, 'room_id': room_id, 'game': game}
    else:
        raise HTTPException(status_code=400, detail='out of range')


@app.get("/join/{room_id}/{order}")
async def join_room(room_id: str, order: int):
    order -= 1
    try:
        [user_id, games] = await routes.join_room(room_id, order)
        game = await routes.make_room(games, order)
        return {'user_id': user_id, 'room_id': room_id, 'game': game}
    except:
        raise HTTPException(status_code=404, detail="Room not found")


@app.get("/lastedit/{room_id}/{last_edit}")
async def check_lastedit(room_id: str, last_edit: str):
    datetime_format = "%Y-%m-%dT%H:%M:%S.%f+00:00"
    last_edit = datetime.datetime.strptime(last_edit, datetime_format)
    update = await routes.check_lastedit(room_id, last_edit)
    return update


@app.get("/load/{room_id}")
async def load_lastedit(room_id: str):
    result = await routes.load_lastedit(room_id)
    return result


@app.post("/chat/{room_id}/{user_id}")
async def chat(room_id: str, user_id: str, chat: str = Form()):
    await routes.chat(room_id, user_id, chat)


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
