from . import player
import random

class gameHub:
    """
    A Class representing the game hub, which is responsible for managing the game state and the players.
        Attributes:
            players (list[Player]): The list of players in the game
            category (str): The selected category of the game
            lobbyID (int): The unique ID of the game lobby
    """

    players: list[player.Player]
    category: str
    lobbyID: int


    def __init__(self, players: list[player.Player], category: str, lobbyID: int):
        """General Constructor for the gameHub Class"""
        self.players = players
        self.lobbyID = lobbyID
        self.category = category

    def setCategory(self, category):
        """Sets the game category
        Args:
            category (str): The category to set for the game
        """
        self.category = category

    def getCategory(self):
        """Gets the game category
        Returns:
            str: The category of the game
        """
        return self.category
    
    def getPlayers(self):
        """Gets the list of players in the game
        Returns:
            list[Player]: The list of players in the game
        """
        return self.players
    
    def getLobbyID(self):
        """Gets the game lobby ID
        Returns:
            int: The lobby ID of the game
        """
        return self.lobbyID
    
    def addPlayer(self, player):
        """Adds a player to the game
        Args:
            player (Player): The player to add to the game
        """
        self.players.append(player)

    def getPlayerNames(self):
        """Gets the names of the players in the game
        Returns:
            list[str]: The list of player names in the game
        """
        playerNames = []
        for p in self.players:
            playerNames.append(p.getName())
        return playerNames

    


    def shuffleAllTerms(self):
        """Shuffles all of the terms entered by the players
        Returns:
            list[str]: A list of all the terms entered by the players, shuffled in random order
        """
        shuffledTerms = []
        for p in self.players:
            shuffledTerms.extend(p.getTerms())
        random.shuffle(shuffledTerms)
        return shuffledTerms

