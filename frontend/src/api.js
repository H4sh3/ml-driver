
function getEntry(envType, settings) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${backendUrl}/api/entry/${envType}/${settings.sensor.num}/${settings.sensor.len}/${settings.sensor.fov}`, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function getAllEntrys() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${backendUrl}/api/all_entrys`, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function getSelection() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `${backendUrl}/api/settings_selection`, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function postEntry(envType, settings, best, solved) {
  var xhr = new XMLHttpRequest();
  var url = `${backendUrl}/api/new_model`;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  const data = prepForRequest(envType,
    settings.sensor.num,
    settings.sensor.len,
    settings.sensor.fov,
    best.net.serialize(),
    best.checkpoints,
    solved)
  xhr.send(data);
}

function prepForRequest(environment,
  num_sensors,
  len_sensors,
  fov,
  model,
  checkpoints,
  solved) {
  return JSON.stringify({
    environment,
    num_sensors,
    len_sensors,
    fov,
    model,
    checkpoints,
    solved
  })
}