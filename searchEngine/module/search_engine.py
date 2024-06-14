
import re
import string
import pandas as pd
import numpy  as np
import datetime


class SearchEngine:
    def __init__(self):
        try:
            # @TODO Get DB object , and prediction algorithms
            self.algorithm_to_implement = None

        except Exception as e :
            print (f"Error in initialization search engine class: {e}")
    
    def search(self , search: string):
        pass
        return True
