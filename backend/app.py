from flask import Flask, request, Response, jsonify
from redis import Redis
from lib.etc import key_from, gen_settings
from lib.db import get_entry
from lib.processing import process_new
import json
import os


app = Flask(__name__)

redisHostname = ''
try:
    os.environ['inDocker']
    redisHostname = 'redis'
except KeyError:
    redisHostname = 'localhost'
print('redis:'+redisHostname)
redis = Redis(host=redisHostname, port=6379)


@app.route('/entry/<string:environment>/<int:num_sensors>/<int:len_sensors>/<int:fov>', methods=['GET'])
def getEntry(environment, num_sensors, len_sensors, fov):
    entry = get_entry(environment, gen_settings(
        num_sensors, len_sensors, fov), redis)
    if entry:
        resp = Response(json.dumps({"status": "model found", "entry": entry}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        resp = Response(json.dumps({"status": "no model found"}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@ app.route('/new_score', methods=['POST'])
def new_score():
    content = request.get_json()
    environment = content["environment"]
    num_sensors = content["num_sensors"]
    len_sensors = content["len_sensors"]
    fov = content["fov"]
    model = content["model"]
    checkpoints = content["checkpoints"]

    settings = gen_settings(num_sensors, len_sensors, fov)
    result = process_new(environment, settings, model, checkpoints, redis)
    return result


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
