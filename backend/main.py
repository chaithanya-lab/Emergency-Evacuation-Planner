from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from graph import get_path
from ai_model import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Emergency Evacuation Planner"
    }

@app.get("/route/{building}")
def route(building: str):

    if building == "BuildingA":

        path, algo_time = get_path(
            "BuildingA",
            "RoomA",
            "Exit2"
        )

    else:

        path, algo_time = get_path(
            "BuildingB",
            "Lab",
            "Exit2"
        )

    return {
        "building": building,
        "route": path,
        "time_ms": algo_time
    }

@app.get("/safety")
def safety():

    result = predict(1, 2)

    return {
        "safe": int(result)
    }

@app.get("/score")
def score():
    return {
        "score": 96
    }

@app.get("/time")
def evacuation_time():
    return {
        "time": "38 Seconds"
    }

@app.get("/sensor")
def sensor():
    return {
        "temperature": 68,
        "smoke": "High",
        "gas": "Low"
    }

@app.get("/crowd")
def crowd():
    return {
        "Exit1": 82,
        "Exit2": 34
    }

@app.get("/alert")
def alert():
    return {
        "message": "Fire detected. Evacuate immediately."
    }

@app.get("/analytics")
def analytics():
    return {
        "bfs": 0.03,
        "dijkstra": 0.05,
        "astar": 0.02
    }