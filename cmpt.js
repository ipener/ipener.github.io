const html = document.documentElement;

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
});
