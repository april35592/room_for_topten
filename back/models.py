
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
