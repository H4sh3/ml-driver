from lib.etc import gen_configurations
from redis import Redis
import os
import json


class ModelWrapper():
    def __init__(self, db):
        self.db = db

        # get existing models
        self.keys = db.get_keys()

        # parse models
        self.models = []

        for key in self.keys:
            val = db.get_value(key)
            val = val.decode('utf-8')
            val = json.loads(val)
            self.add_model(key, val.get('checkpoints'), val.get('solved'))

        # generate array with all untrained settings
        self.untrained_settings = gen_configurations()
        for s in self.keys:
            try:
                self.untrained_settings.remove(s)
            except:
                print(s)

    def add_model(self, key, checkpoints, solved):
        self.models.append([key, checkpoints, solved])

    def get_models(self):
        return self.models

    def process_new(self,key, new_model, new_checkpoints, solved):
        existing_entry = self.db.get_entry(key)

        if existing_entry:
            if not solved:
                return "exists and did not solve"

            if new_checkpoints <= existing_entry["checkpoints"]:
                return "better or equal model exists"

        self.db.write_entry(key, new_model,
                            new_checkpoints, solved)

        self.add_model(key, new_checkpoints, solved)

        self.untrained_settings.remove(key)
        return "new model saved"
