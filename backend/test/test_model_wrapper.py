import unittest
from redis import Redis
from lib.modelWrapper import ModelWrapper
from unittest.mock import MagicMock, Mock

redis = Redis()
redis.get_keys = MagicMock(
    return_value=['RaceEnv-2-75-345'])

model = b'{"model": "{\\"input_nodes\\":5,\\"hidden_nodes\\":3,\\"output_nodes\\":2,\\"weights_ih\\":{\\"rows\\":3,\\"cols\\":5,\\"data\\":[[-0.7699480173583582,-0.7860640549310702,0.2990751261369935,-0.28131706082678676,0.29398746996604774],[0.9062601016139159,1.0508028545692314,-1.0784955160021112,-0.8755599191543593,-0.9482573748217322],[-1.7946106982720635,-0.7859375297167244,-0.023093125904835254,-0.7171763009395518,-0.23728236860357965]]},\\"weights_ho\\":{\\"rows\\":2,\\"cols\\":3,\\"data\\":[[0.4179006412634094,-0.7963452797401049,0.2640235560513502],[-0.625903945209282,-0.6992510963889718,-0.4520866494737241]]},\\"bias_h\\":{\\"rows\\":3,\\"cols\\":1,\\"data\\":[[-0.9476341242583142],[-0.41829704223725983],[0.27024553559595343]]},\\"bias_o\\":{\\"rows\\":2,\\"cols\\":1,\\"data\\":[[0.21955906317702256],[0.32244148085091906]]},\\"learning_rate\\":0.1,\\"activation_function\\":{}}", "checkpoints": 5, "solved": false}'
redis.get_value = MagicMock( return_value=model)


class TestModelWrapper(unittest.TestCase):

    def setUp(self):
        self.m = ModelWrapper(redis)

    def test_model_wrapper_should_init(self):
        self.assertIsNotNone(self.m,ModelWrapper)

    def test_should_get_keys_from_redis(self):
        assert len(self.m.keys) == 1

    def test_should_have_three_models(self):
        assert len(self.m.models) == 1

    def test_wrapper_returns_models(self):
        models = self.m.get_models()
        assert len(models) == 1

        assert models[0][0] == 'RaceEnv-2-75-345'
        assert models[0][1] == 5
        assert models[0][2] == False


    def test_adding_model(self):
        key = 'RaceEnv-2-75-345'
        cp = 7331
        solved = True
        self.m.add_model(key,cp,solved)
        assert len(self.m.models) == 2
        assert self.m.models[1][0] == key
        assert self.m.models[1][1] == cp
        assert self.m.models[1][2] == solved


if __name__ == '__main__':
    unittest.main()
