const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const map = (x, a, b, c, d) => { return (x - a) / (b - a) * (d - c) + c; };

function showMission() {
  _mctr.style.transform = 'translate(-50%, -50%)';
}
function hideMission() {
  _mctr.style.transform = 'translate(-50%, 100%)';
}

function sbmtf() {
  const n = _name.value;
  const e = _email.value;
  const r = _region.value;
  const f = _finish.value;
  const p = _property.value;
  const a = _area.value;

  if (n && e && r && f && p && a) {
    const body = {
      path: 'sign-up',
      data: {
        name: n,
        email: e,
        region: r,
        finish: f,
        property: p,
        area: a
      }
    };

    sendHttps(body);
  } else {
    console.log('Please fill out all fields.');
  }
}

function sbmtc() {
  const n = _name.value;
  const e = _email.value;
  const f = _field.value;
  const t = _team.value;
  
  if (n && e && f && t) {
    const body = {
      path: 'sign-up',
      data: {
        name: n,
        email: e,
        field: f,
        team: t
      }
    };

    sendHttps(body);
  } else {
    console.log('Please fill out all fields.');
  }
}


function sendHttps(body) {
  fetch('https://europe-west6-furoa-co.cloudfunctions.net/send', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(res => {
    console.log('success!', res);
  }).catch(err => {
    console.warn('Something went wrong.', err);
  });
}
