const html = document.documentElement;

_v.width = 3072;
_v.height = 1920;

function setCanvas() {
  if (window.innerWidth < window.innerHeight) {
    _v.style.transform = "translate(-50%, -50%) rotate(-90deg)";

    if (window.innerHeight / window.innerWidth > 1.6) {
      _v.style.width = "100vh";
      _v.style.height = "calc(100vh / 1.6)";
    } else {
      _v.style.height = "100vw";
      _v.style.width = "calc(100vw * 1.6)";
    }
  } else {
    _v.style.transform = "translate(-50%, -50%)";

    if (window.innerWidth / window.innerHeight > 1.6) {
      _v.style.width = "100vw";
      _v.style.height = "calc(100vw / 1.6)";
    } else {
      _v.style.height = "100vh";
      _v.style.width = "calc(100vh * 1.6)";
    }
  }
}
setCanvas();

const scrollV = () => {
  if (_v.duration) {
    const dt = window.scrollY + html.getBoundingClientRect().top;
    const t = (window.scrollY - dt) / (html.scrollHeight - window.innerHeight);

    _v.currentTime = _v.duration * Math.min(Math.max(t, 0), 1);
  }
  requestAnimationFrame(scrollV);
}
_v.addEventListener('loadeddata', function() {
  requestAnimationFrame(scrollV);
}, false);

window.onresize = setCanvas;
window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  if (scrollTop < window.innerHeight) {
    _hdr.style.opacity = map(scrollTop, 0, window.innerHeight, 1, 0);
    _sth.style.opacity = map(scrollTop, 0, window.innerHeight, 1, 0);
  } else {
    _hdr.style.opacity = 0;
    _sth.style.opacity = 0;
  }

  if (scrollTop > 4.5 * window.innerHeight && scrollTop < 6 * window.innerHeight) {
    _fd.classList.add('anim');
  }
});
