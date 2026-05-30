from . import player
import random

class gameHub:
    """
    A Class representing the game hub, which is responsible for managing the game state and the players.
        Attributes:
            players (list[Player]): The list of players in the
    """

    players: list[player.Player]


    def __init__(self):
        """General Constructor for the gameHub Class"""
        self.players = []


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

