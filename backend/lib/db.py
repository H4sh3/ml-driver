import json
from lib.etc import key_from

def get_keys(redis):
    byte_ḱeys = redis.keys()
    keys = []
    for key in byte_ḱeys:
      keys.append(key.decode('utf-8'))
    return keys


def get_value(key,redis):
  return redis.get(key)

def get_entry(environment, settings, redis):
    key = key_from(environment, settings)
    value = redis.get(key)
    if value:
        return json.loads(value)

    return ""


def write_entry(environment, settings, model, checkpoints, solved, redis):
    key = key_from(environment, settings)
    json_entry = gen_entry(model, checkpoints, solved)
    redis.set(key, json_entry)


def gen_entry(model, checkpoints, solved):
    return json.dumps({"model": model, "checkpoints": checkpoints, "solved": solved})
