from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

from routes import Routes
from models import mongodb

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


@app.post("/create")
async def create_room(user_number: int = Form()):
    number = await routes.create_room(user_number)
    return number


@app.get("/{room_id}/{order}")
async def join_room(room_id: str, order: int):
    number = await routes.join_room(room_id, order)
    return number


@app.get("/{room_id}/lastedit/{last_edit}")
async def check_lastedit(room_id: str, last_edit: str):
    update = await routes.check_lastedit(room_id, last_edit)
    return update


@app.on_event("startup")
def on_app_start():
    mongodb.connect()


@app.on_event("shutdown")
async def on_app_shutdown():
    mongodb.close()
