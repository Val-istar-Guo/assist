const callback = 'assistPlugin'


function removeCB(_name) {
  try {
    delete window[_name];
  } catch (e) {
    window[_name] = undefined;
  }
}

function createScript(url, id) {
  const script = document.createElement('script');
  script.setAttribute('src', url);
  script.id = id;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function removeScipt(id) {
  const script = document.getElementById(id);
  document.getElementsByTagName('head')[0].removeChild(script);
}

export default url => {
  return new Promise((resolve, reject) => {
    const cb = callback
    const scriptId = cb

    // register the callback function
    window[cb] = res => {
      resolve(res);
      removeScipt(scriptId);
      removeCB(cb);
    }

    createScript(url, scriptId);
  })
}
