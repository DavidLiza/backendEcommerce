from pymongo import MongoClient
import pandas as pd


class MongoDataBase:

    def __init__(self, connection_key: str):
        self.connection_key = connection_key

    def create_connection(self, database_name: str):
        try:
           self.client = MongoClient(self.connection_key)[database_name]
           return True
        except Exception as e:
           print ("ERROR IN manage_db [create_connection]: {}".format(e))
           return False

    def get_all_collections(self):
        return self.client.list_collection_names()

    def create_collection(self, collection_name: str):
        new_collection = self.client[collection_name]

    def get_collection(self, collection_name: str, as_df: bool):
        try :
            if collection_name not in self.get_all_collections():
                print('The collection specified does not exists on database')
            else:
                if as_df:
                    return pd.DataFrame([x for x in self.client[collection_name].find()])
                else:
                    documents = []
                    for doc in self.client[collection_name].find():
                        doc['_id'] = str(doc['_id'])
                        documents.append(doc)
                    return documents
                    return [x for x in self.client[collection_name].find()]
        except Exception as e :
            print ("Error in get_collection : {} \nCollectionName: {}".format(e , collection_name) )
            return False





print ("------MONGO DB MODULE INITIALIZED -----")