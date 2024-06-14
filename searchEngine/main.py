#uvicorn fastApiService:app --host 0.0.0.0 --port 8000
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__       = ["David Lizarazo"]
__copyright__  = "Copyright 2024, DavidLizarazoDev "
__credits__    = ["David Lizarazo"]
__license__    = "GPL"
__version__    = "0.0.1"
__maintainer__ = ["David Lizarazo"]
__email__      = "davidlizarazovesga@hotmail.com"
__status__     = "Development"

import os
import sys
import json


try:
    with open ("searchEngine/config/config.json") as configFile:
        CONFDATA = configFile.read()
        CONFDATA = json.loads(CONFDATA)
except Exception as e:
    print ("@@@ Error Loading config.json @@@")
    print (e)
    sys.exit(0)
    
try:
    currCondaEnv = os.environ['CONDA_DEFAULT_ENV']
    if currCondaEnv != "LinkTic" or ( not currCondaEnv ) :
        print ("@@@ RUNNING IN ENV DIFFERENT FROM 'LinkTic'  @@@")
    print (currCondaEnv)
except Exception as e :
    print ("@@@PROBABLY NOT CONDA INSTALLED@@@")
    sys.exit(0)

try:
    from fastapi import FastAPI, Body 
    from pydantic import BaseModel
    # import joblib # This is for IA Models Integration 
except Exception as e:
    print ("@@@ ERROR on Fast API|joblib Import: {} @@@".format(e))
    sys.exit(0)

try:
    import json
except Exception as e:
    print ("@@@ ERROR on Imports: {} @@@".format(e))
    sys.exit(0)

try:
    from module import search_engine as se
    from module  import manage_db as MDB
except Exception as e:
    print ("ERROR on Importing MODULES: {}".format(e))

# try:
#     # Load the trained model
#     model = joblib.load('models/some_Model.sav')
# except Exception as e:
#     print ("ERROR on loading MODELS: {}".format(e))

class BackEnd:
    def __init__(self) -> None:
        self.control_variable = 0
        self.init_tables()

    def init_tables(self):
        try:
            self.DB_OBJ = MDB.MongoDataBase(CONFDATA["db"]["url"] )

            if not self.DB_OBJ.create_connection(CONFDATA["db"]["name"]):
                print ("❌ERROR CREATING INITIAL CONNECTION")
            else:
                print ("✅MONGO DB CONNECTION SUCCESFULL")

        except Exception as e:
            print ("❌Error in DB initialization")
        
    def predict_search_engine(self, data: dict):
        pass
    
    def predict_home_recommender(self, data: dict):
        pass


app = FastAPI()
BE = BackEnd()

class userAtHome(BaseModel):
    session: str = Body(...,min_length=10, description="The session identifier is not valid"),
    user: str = Body(...,min_length=10, description="The user identifier is not valid"),

class userSearch(BaseModel):
    # @TODO : The search must be saved on an user history search, so in the feature , can recommend similar products
    search: str = Body(...,min_length=2, description="The search identifier is not valid"),
    session: str = Body(...,min_length=10, description="The session identifier is not valid"),
    user: str = Body(...,min_length=10, description="The user identifier is not valid"),


@app.post("/searchEngine")
def search_engine(data: dict):
    predictions = BE.predict_search_engine(data)
    return predictions

@app.post("/homeRecommender")
def homme_recommender(data: userAtHome):
    recommendation = BE.predict_home_recommender(data)
    return recommendation
