import json
from redis import Redis
import os

class DB():
  def __init__(self):
    redisHostname = ''
    try:
        os.environ['inDocker']
        redisHostname = 'redis'
    except KeyError:
        redisHostname = 'localhost'
    self.redis = Redis(host=redisHostname, port=6379)


  def get_keys(self):
      byte_keys = self.redis.keys()
      keys = []
      for key in byte_keys:
        keys.append(key.decode('utf-8'))
      return keys


  def get_value(self,key):
    return self.redis.get(key)


  def get_entry(self,key):
      value = self.redis.get(key)
      if value:
          return json.loads(value)

      return ""


  def write_entry(self,key, model, checkpoints, solved):
      json_entry = self.gen_entry(model, checkpoints, solved)
      self.redis.set(key, json_entry)


  def gen_entry(self,model, checkpoints, solved):
      return json.dumps({"model": model, "checkpoints": checkpoints, "solved": solved})
