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

print("####### DOWNLOADING LIBRARIES NEEDED ######")
try:
    currCondaEnv = os.environ['CONDA_DEFAULT_ENV']
    if currCondaEnv != "LinkTic" or ( not currCondaEnv ) :
        print ("@@@ RUNNING IN ENV DIFFERENT FROM 'LinkTic'  @@@")

    print (currCondaEnv)
except Exception as e :
    print ("@@@PROBABLY NOT CONDA INSTALLED@@@")
    sys.exit(0)

try:
    from flask import jsonify
    print ("Module correctly flask Already Installed")
except:
    entrada = input("Install [flask] Dependencie  : (y/n)")
    if entrada == 'y':
        os.system('pip install flask flask-restx flask-expects-json')
        # os.system('conda install -c conda-forge dlib')
        # os.system('pip install face-recognition')


# try:
#     from pymongo import MongoClient
#     print ("Module pymongo Already Installed")
# except:
#     entrada = input("Install [pymongo] dependencie  : (y/n)")
#     if entrada == 'y':
#         os.system('pip install pymongo')



# Fast Api INstallation
# pip install "uvicorn[standard]"
# pip install fastapi


# from utils import manage_db as mdb
# from sklearn.metrics.pairwise import cosine_similarity
# from scipy import sparse
