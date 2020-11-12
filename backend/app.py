from flask import Flask, request, Response, jsonify

from lib.etc import key_from, gen_settings, gen_configurations
from lib.db import DB
from lib.modelWrapper import ModelWrapper
import random
import json
import os

from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

db = DB()
modelWrapper = ModelWrapper(db)

@app.route('/api/entry/<string:environment>/<int:num_sensors>/<int:len_sensors>/<int:fov>', methods=['GET'])
def getEntry(environment, num_sensors, len_sensors, fov):

    settings = gen_settings(num_sensors, len_sensors, fov)
    key = key_from(environment, settings)
    entry = db.get_entry(key)

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
    keys = db.get_keys()
    resp = Response(json.dumps(keys))
    return resp


@app.route('/api/all_entrys', methods=['GET'])
def allEntrys():
    resp = Response(json.dumps(modelWrapper.get_models()))
    return resp


@app.route('/api/len_untrained_settings', methods=['GET'])
def len_untrained():
    resp = Response(json.dumps(len(modelWrapper.untrained_settings)))
    return resp


@app.route('/api/settings_selection', methods=['GET'])
def settingsSelection():
    resp = Response(json.dumps(modelWrapper.untrained_settings))
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
    status = modelWrapper.process_new(key_from(environment,settings), model,
                                      checkpoints, solved)

    resp = Response(json.dumps({"status": status}))
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
