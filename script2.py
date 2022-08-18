import json
from os import access
import requests
import time

AUTHENTICATION_LOGIN_URL = 'http://localhost:3001/login'
REFRESH_TOKEN_URL = 'http://localhost:3001/token'
LOGOUT_URL = 'http://localhost:3001/token'
API_URL = 'http://localhost:3000/'
USERNAME_REQUEST_FIELD = 'username'
PASSWORD_REQUEST_FIELD = 'password'
TOKEN_REQUEST_FIELD = 'token'
ACCESS_TOKEN_RESPONSE_FIELD = 'accessToken'
REFRESH_TOKEN_RESPONSE_FIELD = 'refreshToken'
DEVICE_SERIAL_FIELD = 'serial'

def main():
    session = Session()
    getAccess(session)
    
    isDeviceInDatabase(session)
class Session:
    accessToken = ''
    refreshToken = ''
    userId = ''
    deviceId = ''

def isDeviceInDatabase(session) :
    payload = {DEVICE_SERIAL_FIELD: session.deviceId}
    bearer = 'Bearer '
    headers = {"Authorization": bearer + ' ' + session.accessToken}
    response = requests.get(API_URL + 'devices', headers = headers, params=payload)
    if response :
        jsonResponse = response.json()
        if len(jsonResponse) > 0:
            session.deviceId = jsonResponse[0].get('Id')
            return True
    return False

def getAccess(session):
    data = {}
    data[USERNAME_REQUEST_FIELD] = 'weatherAppAdmin'
    data[PASSWORD_REQUEST_FIELD] = 'weatherappAdmin'
    response = requests.post(AUTHENTICATION_LOGIN_URL, json=data)
    if response :
        jsonResponse = response.json()
        session.accessToken = jsonResponse[ACCESS_TOKEN_RESPONSE_FIELD]
        session.refreshToken = jsonResponse[REFRESH_TOKEN_RESPONSE_FIELD]
        session.userId = jsonResponse['id']

def refreshAccess(session):
    data = {}
    data[TOKEN_REQUEST_FIELD] = session.refreshToken
    bearer = 'Bearer '
    headers = {"Authorization": bearer + ' ' + session.accessToken}
    response = requests.post(REFRESH_TOKEN_URL, json=data, headers=headers)
    if response:
        jsonResponse = response.json()
        session.accessToken = jsonResponse[ACCESS_TOKEN_RESPONSE_FIELD]

main()


