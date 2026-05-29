
class Player:
    """
    A Class representing a player in the 3*3 game.
        Attributes:
            name (str): The name of the player
            points (int): The amount of points the player has
            terms (list[str]): The list of terms the player has entered
    
    """

    name: str
    points: int
    terms: list[str]

    def __init__(self, name: str, points: int, terms: list[str]):
        """
        General Constructor for the Player Class
        Args:
            name (str): The name of the player
            points (int): The amount of points the player has
            terms (list[str]): The list of terms the player has entered
        """
        self.name = name
        self.points = points
        self.terms = terms

    def __init__(self, name: str):
        """
        Constructor for the Player Class for the start of the game, where the player has no points and no terms.
        Args:
            name (str): The name of the player
            points (int): The amount of points the player has
            terms (list[str]): The list of terms the player has entered
        """
        self.name = name
        self.points = 0
        self.terms = []

    def getName(self):
        """Returns the name of the player"""
        return self.name
    
    def getPoints(self):
        """Returns the points of the player"""
        return self.points
    
    def getTerms(self):
        """Returns the terms of the player"""
        return self.terms

    def receivePoint(self):
        """Adds a point to the player's score"""
        self.points += 1

    def addTerm(self, term: str):
        """
        Adds a term to the player's list of terms
        Args:
            term (str): The term to be added to the player's list of terms
        """
        self.terms.append(term)