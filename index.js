const html = document.documentElement;
const context = _cnvs.getContext("2d");

const frameCount0 = 60;
const frameCount1 = 30;
const frameCount2 = 120;
let lastFrame0 = -1;
let lastFrame1 = -1;
let lastFrame2 = -1;
const currentFrame0 = index => (
  `anim/flip/${index.toString().padStart(4, '0')}.jpg`
)
const currentFrame1 = index => (
  `anim/zoom/${index.toString().padStart(4, '0')}.jpg`
)
const currentFrame2 = index => (
  `anim/detail/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 0; i < frameCount0; i++) {
    const img = new Image();
    img.src = currentFrame0(i);
  }
  for (let i = 1; i < frameCount1; i++) {
    const img = new Image();
    img.src = currentFrame1(i);
  }
  for (let i = 0; i < frameCount2; i++) {
    const img = new Image();
    img.src = currentFrame2(i);
  }
};

_cnvs.width = 3072;
_cnvs.height = 1920;

const bg = new Image();
bg.src = 'anim/zoom/0000.jpg';
bg.onload = function() { context.drawImage(bg, 0, 0); }

const img = new Image();
const updateImage0 = index => {
  if (index == lastFrame0) return;
  lastFrame0 = index;
  img.src = currentFrame0(index);
  context.drawImage(img, _cnvs.width - img.width, (_cnvs.height - img.height) / 2);
}
const updateImage1 = index => {
  if (index == lastFrame1) return;
  lastFrame1 = index;
  bg.src = currentFrame1(index);
  context.drawImage(bg, 0, 0);
}
const updateImage2 = index => {
  if (index == lastFrame2) return;
  lastFrame2 = index;
  img.src = currentFrame2(index);
  context.drawImage(img, _cnvs.width - img.width, (_cnvs.height - img.height) / 2);
}

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

  if (scrollTop > 5.5 * window.innerHeight) {
    const i = clamp(Math.ceil(map(scrollTop, 5.5 * window.innerHeight, 6.5 * window.innerHeight, 0, frameCount1)) + 1, 0, frameCount1);
    updateImage1(i);
  } else {
    updateImage1(0);
  }

  if (scrollTop < 1.5 * window.innerHeight) {
    const i = clamp(Math.ceil(scrollTop / (1.5 * window.innerHeight) * frameCount0) + 1, 0, frameCount0);
    //if (frameIndex < frameCount0 - 1) {
        //requestAnimationFrame(() => updateImage0(frameIndex));
    //}
    updateImage0(i);
  } else if (scrollTop < 3.5 * window.innerHeight) {
    updateImage0(frameCount0);
  } else if (scrollTop < 4.5 * window.innerHeight) {
    const i = clamp(Math.ceil(map(scrollTop, 3.5 * window.innerHeight, 4.5 * window.innerHeight, frameCount0, 0)) - 1, 0, frameCount0);
    //if (frameIndex > 0 && frameIndex < frameCount0 - 1) {
        //requestAnimationFrame(() => updateImage0(frameIndex));
    //}
    updateImage0(i);
  } else {
    updateImage0(0);
  }

  if (scrollTop > 7 * window.innerHeight) {
    const i = clamp(Math.ceil(map(scrollTop, 7 * window.innerHeight, 9 * window.innerHeight, 0, frameCount2)) + 1, 0, frameCount2);
    updateImage2(i);
  } else if (scrollTop > 9 * window.innerHeight) {
    updateImage2(frameCount2);
  } else {
    updateImage2(0);
  }

  if (scrollTop > 4.5 * window.innerHeight && scrollTop < 6 * window.innerHeight) {
    _fd.classList.add('anim');
  } else {
    //_fd.classList.remove('anim');
  }
});

preloadImages();
