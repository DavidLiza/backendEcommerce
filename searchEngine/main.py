#uvicorn fastApiService:app --host 0.0.0.0 --port 8041
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
    from fastapi import FastAPI, Body , Request, Response, HTTPException
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import uvicorn
    from starlette.middleware.base import BaseHTTPMiddleware
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

        DATA = self.DB_OBJ.get_collection("product", False)
        return {"code": "LKT001" , "result": DATA } 
    def dommy_predict_home_recommender(self, data: dict):

        TEST_DATA =[ {
              "id": "123456" ,
              "imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPz9RlMyKdIlFhN11RXDnjl1Wj_bv0mRu6rw&s" ,
              "description": "This is the description Of Product A",
              "name" : "Producto A"
            },
            {
              "id": "789012" ,
              "imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr8KaHxKE41sR2UKx9opvPepFhDFRdVL39TA&s" ,
              "description": "This is the description Of Product B",
              "name" : "Producto B"
            }]
        return {"code": "LKT001" , "result": TEST_DATA } 
    


app = FastAPI()
BE = BackEnd()

class CustomResponseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            if response.status_code == 200 :
                # Read and parse the response body
                body = [section async for section in response.body_iterator]
                original_response = json.loads(body[0])
                modified_response = {
                    "code": "LKT001",
                    "result": original_response
                }
            else :
                modified_response = {
                    "code": "LKT003",
                    "result": response.body()
                }
            
            return JSONResponse(modified_response)
        except Exception as e:
            

            modified_response = {
                "code": "LKT004",
                "result": "OK"
            }
            return JSONResponse(modified_response)
            print ("@@@ ERROR on dispatch: {} @@@".format(e))
            raise HTTPException(status_code=500, detail="Simulated error")

origins = [
    "*"  # Your frontend URL
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    # CustomResponseMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)



class userAtHome(BaseModel):
    session: str = Body(...,min_length=10, description="The session identifier is not valid"),
    user: str = Body(...,min_length=10, description="The user identifier is not valid"),

class userSearch(BaseModel):
    # @TODO : The search must be saved on an user history search, so in the feature , can recommend similar products
    search: str = Body(...,min_length=2, description="The search identifier is not valid"),
    session: str = Body(...,min_length=10, description="The session identifier is not valid"),
    user: str = Body(...,min_length=10, description="The user identifier is not valid"),


@app.post("/home/searchEngine")
async def search_engine(data: dict):
    predictions = BE.predict_search_engine(data)
    return predictions

@app.post("/home/homeRecommender")
async def homme_recommender(data: userAtHome):
    try :
        recommendation = BE.predict_home_recommender(data)
        return recommendation
    except Exception as e :
        print ("@@@ ERROR on predict_home_recommender: {} @@@".format(e))
        raise HTTPException(status_code=400, detail="Simulated error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8897)
