
from pymongo import MongoClient
import certifi


class MongoDB:
    def __init__(self):
        self.client = None
        self.engine = None

    def connect(self):
        self.client = MongoClient(
            "mongodb://localhost:27017")
        self.db = self.client['TOPTEN']
        print("DB와 연결되었습니다.")

    def close(self):
        self.client.close()


mongodb = MongoDB()

# class Chat(Base):
#     __tablename__ = "chat"

#     id = Column(Integer, primary_key=True)
#     create_at = Column(DateTime, nullable=False)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     text = Column(Text)


# class Memo(Base):
#     __tablename__ = "memo"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     question_id = Column(Integer, ForeignKey("question.id"))
#     answer = Column(Text)

#     class Config:
#         schema_extra = {
#             "example": {
#                 "id": "12",
#                 "user_id": "1",
#                 "question_id": "1",
#                 "answer": "null"
#             }
#         }


# class Question(Base):
#     __tablename__ = "question"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey("user.id"))
#     text = Column(Text)
#     memo = relationship("Memo", backref="question")

#     class Config:
#         schema_extra = {
#             "example": {
#                 "id": "1",
#                 "user_id": "1",
#                 "text": "null"
#             }
#         }


# class Room(Base):
#     __tablename__ = "room"

#     id = Column(Integer, primary_key=True)
#     user_number = Column(Integer, nullable=False)
#     last_chat = Column(DateTime, nullable=False)
#     game = Column(Integer, nullable=False)
#     user = relationship("User", backref="room")

#     class Config:
#         schema_extra = {
#             "example": {
#                 "id": "1",
#                 "user_number": "3",
#                 "last_chat": "None",
#                 "game": "[[1,2,3,4,5,6,7,8,9,10],[2,3,4,5,6,7,8,9,10,1],[3,4,5,6,7,8,9,10,1,2]]"
#             }
#         }


# class User(Base):
#     __tablename__ = "user"

#     room_id = Column(Integer, ForeignKey("room.id"))  # room.id와 연결
#     id = Column(Integer, primary_key=True)
#     order = Column(Integer, nullable=False)
#     username = Column(String)
#     question = relationship("Question", backref="room")
#     chat = relationship("Chat", backref="room")
#     memo = relationship("Memo", backref="room")

#     class Config:
#         schema_extra = {
#             "example": {
#                 "room_id": "1",
#                 "id": "0",
#                 "order": "1",
#                 "username": "null"
#             }
#         }
