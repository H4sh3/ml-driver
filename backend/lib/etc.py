def key_from(environment, settings):
    nS = str(settings["num_sensors"])
    nL = str(settings["len_sensors"])
    fov = str(settings["fov"])
    return f'{environment}-{nS}-{nL}-{fov}'


def gen_settings(num_sensors, len_sensors, fov):
    return {"num_sensors": num_sensors, "len_sensors": len_sensors, "fov": fov}


def gen_configurations():
  # generates all possible configuration combinations
  configs = []
  for env in ['RaceEnv','TrafficEnv']:
    for num_sensors in range(2,10,1):
      for len_sensors in range(10,125,5):
        for fov in range(10,350,5):
          configs.append(f'{env}-{num_sensors}-{len_sensors}-{fov}')
  return configs