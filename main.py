from fastapi import FastAPI, Form

from routes import Routes
from models import mongodb

import datetime


app = FastAPI()
routes = Routes()


@app.post("/")
async def create_room(user_number: int = Form()):
    number = await routes.create_room(user_number.value)
    return number


@app.get("/{room_id}/{order}")
async def join_room(room_id: str, order: int):
    number = await routes.join_room(room_id.value, order.value)
    return number


@app.get("/{room_id}/lastedit/{last_edit}")
async def check_lastedit(room_id: str, last_edit: str):
    update = await routes.check_lastedit(room_id.value, last_edit.value)
    return update


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
