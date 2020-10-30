def key_from(environment,settings):
    nS = str(settings["num_sensors"])
    nL = str(settings["len_sensors"])
    fov = str(settings["fov"])
    return f'{environment}-{nS}-{nL}-{fov}'

def gen_settings(num_sensors, len_sensors, fov):
  return {"num_sensors": num_sensors, "len_sensors": len_sensors, "fov": fov}
