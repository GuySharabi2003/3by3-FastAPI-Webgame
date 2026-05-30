from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import GameLogic.gameHub as gameHub
import GameLogic.player as player


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

currentGameHub = gameHub.gameHub()

@app.get("/")
def read_root():
    return {"message": "Hello, World! Your FastAPI is working!"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}


@app.post("/add_player/{player_name}")
def add_player(player_name: str):
    new_player = player.Player(player_name)
    currentGameHub.players.append(new_player)

@app.post("/start_game/{player_name}")
def start_game(player_name: str):
    add_player(player_name)
    return {"message": f"Player {player_name} added and game started!"}