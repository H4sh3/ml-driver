import fakeredis

def test1():
    r = fakeredis.FakeStrictRedis()
    r.set('foo', 'bar')
    print(r.get('foo'))