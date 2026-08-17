import json
import os
from pymongo import MongoClient

_client = None

def get_collection():
    global _client
    if _client is None:
        _client = MongoClient(
            os.environ["MONGODB_URI"],
            maxPoolSize=int(os.getenv("MONGODB_MAX_POOL_SIZE", "10")),
            connectTimeoutMS=int(os.getenv("MONGODB_CONNECT_TIMEOUT_MS", "5000")),
            serverSelectionTimeoutMS=int(os.getenv("MONGODB_SERVER_SELECTION_TIMEOUT_MS", "5000")),
        )
    db = _client[os.environ["MONGODB_DATABASE"]]
    return db[os.environ["MONGODB_COLLECTION"]]

def handler(event, context):
    business_id = (event.get("pathParameters") or {}).get("id")
    if not business_id:
        return {"statusCode": 400, "body": json.dumps({"code": "INVALID_REQUEST"})}

    document = get_collection().find_one(
        {"businessId": business_id},
        max_time_ms=int(os.getenv("MONGODB_MAX_TIME_MS", "3000")),
    )

    return {
        "statusCode": 200 if document else 404,
        "body": json.dumps({"data": document}, default=str),
    }
