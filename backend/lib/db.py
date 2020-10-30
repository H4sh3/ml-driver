import json
from lib.etc import key_from


def get_entry(environment, settings,redis):
    key = key_from(environment, settings)
    value = redis.get(key)
    if value:
      return json.loads(value)
    
    return ""


def write_entry(environment, settings, model, checkpoints,redis):
    key = key_from(environment, settings)
    json_entry = gen_entry(model, checkpoints)
    redis.set(key, json_entry)


def gen_entry(model, checkpoints):
    return json.dumps({"model": model, "checkpoints": checkpoints})
