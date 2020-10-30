import fakeredis
import json
from lib.etc import key_from

def test1():
    r = fakeredis.FakeStrictRedis()
    r.set('foo', 'bar')
    val = r.get('foo').decode("utf-8")
    assert val == 'bar'


def test2():
    x = {"num_sensors": 5, "len_sensors": 120, "fov": 90}
    assert x["num_sensors"] == 5

    y = json.dumps(x)
    assert y == '{"num_sensors": 5, "len_sensors": 120, "fov": 90}'


def test_settings_to_key():
    settings = {"num_sensors": 5, "len_sensors": 120, "fov": 90}
    env = "race"
    key = key_from(env, settings)
    assert key == 'race-5-120-90'
