from flask import Flask, request, Response, jsonify
from redis import Redis
from lib.etc import key_from, gen_settings, gen_configurations
from lib.db import get_entry, get_keys,get_value
from lib.processing import process_new
import random
import json
import os

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

redisHostname = ''
try:
    os.environ['inDocker']
    redisHostname = 'redis'
except KeyError:
    redisHostname = 'localhost'
print('redis:'+redisHostname)
redis = Redis(host=redisHostname, port=6379)

untrained_settings = gen_configurations()
solved_settings = get_keys(redis)
for s in solved_settings:
    try:
        untrained_settings.remove(s)
    except:
        print(s)

@app.route('/api/entry/<string:environment>/<int:num_sensors>/<int:len_sensors>/<int:fov>', methods=['GET'])
def getEntry(environment, num_sensors, len_sensors, fov):
    entry = get_entry(environment, gen_settings(
        num_sensors, len_sensors, fov), redis)

    if entry and entry["solved"]:
        resp = Response(json.dumps({"status": "model found", "entry": entry}))
        return resp

    if entry and not entry["solved"]:
        resp = Response(json.dumps({"status": "found but not solved"}))
        return resp

    resp = Response(json.dumps({"status": "no model found"}))
    return resp


@app.route('/api/keys', methods=['GET'])
def getKeys():
    keys = get_keys(redis)

    stringed = []
    for key in keys:
        stringed.append(key.decode('utf-8'))
    resp = Response(json.dumps(stringed))
    return resp

@app.route('/api/all_entrys', methods=['GET'])
def allEntrys():
    keys = get_keys(redis)

    arr = []
    for key in keys:
      val = get_value(key,redis)
      val = val.decode('utf-8')
      val = json.loads(val)
      arr.append([key,val.get('checkpoints'),val.get('solved')])

    resp = Response(json.dumps(arr))
    return resp


@app.route('/api/all_settings', methods=['GET'])
def allSettings():
    resp = Response(json.dumps(gen_configurations()))
    return resp


@app.route('/api/untrained_settings', methods=['GET'])
def openSettings():
    resp = Response(json.dumps(untrained_settings))
    return resp


@app.route('/api/len_untrained_settings', methods=['GET'])
def len_untrained():
    resp = Response(json.dumps(len(untrained_settings)))
    return resp

@app.route('/api/settings_selection', methods=['GET'])
def settingsSelection():

    resp = Response(json.dumps(untrained_settings))
    return resp


@app.route('/api/new_model', methods=['POST', 'OPTIONS'])
def newModel():
    content = request.get_json()
    if not content:
        resp = Response('')
        return resp
    environment = content["environment"]
    num_sensors = content["num_sensors"]
    len_sensors = content["len_sensors"]
    fov = content["fov"]
    model = content["model"]
    checkpoints = content["checkpoints"]
    solved = content["solved"]

    settings = gen_settings(num_sensors, len_sensors, fov)
    status = process_new(environment, settings, model,
                         checkpoints, solved, redis)

    if status == "new model saved":
        key = key_from(environment, settings)
        try:
          untrained_settings.remove(key)
        except:
          # can happen if it was saved allrdy
          print(f'could not delete {key}')

    resp = Response(json.dumps({"status": status}))
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
