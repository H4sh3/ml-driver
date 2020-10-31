
function getEntry(envType, settings) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${backendUrl}/entry/${envType}/${settings.sensor.num}/${settings.sensor.len}/${settings.sensor.fov}`, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function postEntry(envType,settings,best) {
  var xhr = new XMLHttpRequest();
  var url = `${backendUrl}/new_score`;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  const data = prepForRequest(envType,
    settings.sensor.num,
    settings.sensor.len,
    settings.sensor.fov,
    best.net.serialize(),
    best.checkpoints)
  xhr.send(data);
}

function prepForRequest(environment,
  num_sensors,
  len_sensors,
  fov,
  model,
  checkpoints) {
  return JSON.stringify({
    environment,
    num_sensors,
    len_sensors,
    fov,
    model,
    checkpoints,
  })
}