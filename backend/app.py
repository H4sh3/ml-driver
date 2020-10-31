from flask import Flask, request, Response, jsonify
from redis import Redis
from lib.etc import key_from, gen_settings
from lib.db import get_entry
from lib.processing import process_new
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


@app.route('/api/entry/<string:environment>/<int:num_sensors>/<int:len_sensors>/<int:fov>', methods=['GET'])
def getEntry(environment, num_sensors, len_sensors, fov):
    entry = get_entry(environment, gen_settings(
        num_sensors, len_sensors, fov), redis)
    if entry:
        resp = Response(json.dumps({"status": "model found", "entry": entry}))
        return resp
    else:
        resp = Response(json.dumps({"status": "no model found"}))
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

    settings = gen_settings(num_sensors, len_sensors, fov)
    status = process_new(environment, settings, model, checkpoints, redis)
    resp = Response(json.dumps({"status": status}))
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
