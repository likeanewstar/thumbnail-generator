"use strict"

// INIT (AFTER LOAD)
window.addEventListener('DOMContentLoaded', () => {
    initFactory()
});

const initFactory = () => {
  init({
    defaultImgUrl: 'https://images.unsplash.com/photo-1644224076179-31d622e21511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    defaultTitle: '제목을 입력하세요',
    defaultSubTitle: 'JINIWORKS WEB MANUEL',
  });
}

// HTML2CANVAS API
const produceImageBtn = document.querySelector('#export');
const captureModal = document.querySelector('.capture_modal');
const mod = document.querySelectorAll('.mod');
const overlay = document.querySelector('.overlay');

const captureExport = function () {
  html2canvas(document.querySelector('#capture'), {
    logging: true,
    letterRendering: 1,
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    captureModal.appendChild(canvas).classList.add('canvas');
  });

  mod.forEach((e) => e.classList.remove('hidden'));
};

const removeCapture = function () {
  if(captureModal.firstElementChild) {
    captureModal.removeChild(captureModal.firstElementChild);
  }

  mod.forEach((e) => e.classList.add('hidden'));
};

produceImageBtn.addEventListener('click', captureExport);
overlay.addEventListener('click', removeCapture);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    removeCapture();
  }
});


// INPUT IMPLEMENTING
const inputFields = document.querySelectorAll('.input-field');

const updateInputValue = function (e) {
  const target = e.target.dataset.set;
  document.querySelector(`.${target}`).textContent = e.target.value;
};

inputFields.forEach((e) => {
  e.addEventListener('input', updateInputValue);
});


// BACKGROUND GENERATORS
// RANDOM COLOR
const randomSolidBtn = document.querySelector('.random-solid');
const randomGradientBtn = document.querySelector('.random-gradient');
const domBody = document.body;
const preview = document.querySelector('.preview');
const backgroundBtns = document.querySelector(
  '#background-btn-container'
).children;
const componentsBtns = document.querySelectorAll('.component-opt');

const randomRGB = function () {
  let rgb = '';
  rgb += (Math.floor(Math.random() * 90 + 1) + 150)
    .toString(16)
    .padStart(2, '0');
  rgb += (Math.floor(Math.random() * 90 + 1) + 150)
    .toString(16)
    .padStart(2, '0');
  rgb += (Math.floor(Math.random() * 90 + 1) + 150)
    .toString(16)
    .padStart(2, '0');
  return rgb;
};

const changeBackground = function () {
  const rgb = randomRGB();

  [...backgroundBtns].forEach((e) => {
    e.classList.remove('selected');
  });
  randomSolidBtn.classList.add('selected');

  domBody.style.background = preview.style.background = '';
  domBody.style.backgroundColor = preview.style.backgroundColor = `#${rgb}`;
};

randomSolidBtn.addEventListener('click', changeBackground);

const changeGradient = function () {
  const rgb1 = randomRGB();
  const rgb2 = randomRGB();

  [...backgroundBtns].forEach((e) => {
    e.classList.remove('selected');
  });
  randomGradientBtn.classList.add('selected');

  domBody.style.background = `linear-gradient(to bottom, #${rgb1}, #${rgb2})`;
  preview.style.background = `linear-gradient(to bottom, #${rgb1}, #${rgb2})`;
};

randomGradientBtn.addEventListener('click', changeGradient);


// COMPONENT LAYOUT
const composition = document.querySelector('.components');

const changeLayout = function (e) {
  const opt = e.target.dataset.set;
  document.querySelector('.components').id = opt;

  componentsBtns.forEach((e) => {
    e.classList.remove('selected');
  });

  e.target.classList.add('selected');
};

componentsBtns.forEach((e) => {
  e.addEventListener('click', changeLayout);
});


// IMAGE URL BACKGROUND
const imgBtn = document.querySelector('.img-url');

const imageBackground = function () {
  const regex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  let imgUrl = prompt('이미지 주소를 입력하세요.');
  if (imgUrl === null) return;
  if (!imgUrl.match(regex)) {
    // 유효하지 않은 주소를 입력했을 때 알림 발생
    alert('올바르지 않은 URL입니다.');
    return;
  }

  domBody.style.background = preview.style.background = `url('${imgUrl}')`;
  domBody.style.backgroundSize = preview.style.backgroundSize = 'cover';
  domBody.style.backgroundRepeat = preview.style.backgroundRepeat = 'no-repeat';
  domBody.style.backgroundPosition = preview.style.backgroundPosition =
    'center';

  [...backgroundBtns].forEach((e) => {
    e.classList.remove('selected');
  });
  imgBtn.classList.add('selected');
};

imgBtn.addEventListener('click', imageBackground);


// TEXT STYLE FUNCTIONS
const prevTitle = document.querySelector('.title');
const prevSubtitle = document.querySelector('.subtitle');
const prevCategory = document.querySelector('.category');
const allBtns = document.querySelectorAll('.btn');
const initBtn = document.querySelector('#initialize');

const textstyleContainer = document.querySelector('.text-style');
const textShadowBtn = document.querySelector('.text-shadow');
const textInvertBtn = document.querySelector('.text-invert');
const textSizeBtn = document.querySelector('.text-size');
const textstyleBtns = document.querySelectorAll('.text-btn');
const renderTxt = document.querySelectorAll('.render');

const init = function (opt) {
  domBody.style.background =
    `url(${opt.defaultImgUrl}) center center / cover no-repeat`;
  preview.style.background =
    `url(${opt.defaultImgUrl}) center center / cover no-repeat`;
  domBody.style.backgroundColor = preview.style.backgroundColor = '#78aaf9';
  prevTitle.textContent = opt.defaultTitle;
  prevSubtitle.textContent = opt.defaultSubTitle;

  allBtns.forEach((e) => {
    e.classList.remove('selected');
  });

  inputFields.forEach((e) => {
    e.value = '';
  });

  prevTitle.style.fontSize = '65px';
  prevSubtitle.style.fontSize = '22px';

  componentsBtns[0].classList.add('selected');
  inputFields[0].focus();
  document.querySelector('.components').id = 'comp-opt1';
};

initBtn.addEventListener('click', initFactory);