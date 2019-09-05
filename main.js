const brosStr = `🚐🚙🚎🗻🏕️🏣🗼⛺⛩️🚚🍒🍙🍱🍚🍘🍛🍢🍣🍤🍥🥮🥟🍵🍶🥢🇯🇵🎌`;

const emojiStringToArray = str => {
  const split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  const arr = [];

  for (var i = 0; i < split.length; i++) {
    char = split[i];

    if (char !== "") {
      arr.push(char);
    }
  }

  return arr;
};

const bros = emojiStringToArray(brosStr);

function randomArr(arr) {
  return bros[Math.floor(Math.random() * arr.length)];
}

function collide(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
}

function getColliding(arr, el) {
  return arr.filter(obj => collide(obj, el));
}

function createBroDom() {
  const $bro = document.createElement('div');
  $bro.classList.add("bro");
  $bro.innerHTML = `<div class="bro__wrap">
    <span class="bro__inner">${randomArr(bros)}</span>
    <span class="bro__shadow"></span>
  </div>`;
  return $bro;
}

const brosPositionsArr = [];

function broFest(e) {
  const coords = e;
  const $el = createBroDom();
  $el.setAttribute('style', `top:${coords.pageY}px; left:${coords.pageX}px;`);
  document.querySelector('body').appendChild($el);
  const y = (Math.random() <= .5 ? -1 : 1) * Math.random() * (window.innerHeight * .2);
  const x = (Math.random() <= .5 ? -1 : 1) * Math.random() * (window.innerWidth * .2);
  const relX = Math.min(1, (coords.pageX + x) / window.innerWidth);
  const relY = Math.min(1, (coords.pageY + y) / window.innerHeight);
  const broObj = {
    x: relX,
    y: relY,
    xAbs: x,
    yAbs: y,
    height: .05,
    width: .05,
    $el
  };
  const colliders = getColliding(brosPositionsArr, broObj);
  brosPositionsArr.push(broObj);
  setTimeout(() => {
    $el.style.transform = `translate3d(${x}px, ${y}px, ${y * 1000}px)`;
    setTimeout(() => {
      colliders.forEach(obj => {
        obj.$el.style['transition-duration'] = '500ms';
        obj.$el.style.transform = `translate3d(${obj.xAbs + Math.sign(x) * 20 * (1 * relX)}px, ${obj.yAbs + Math.sign(y) * 20 * (1 * relY)}px, ${obj.y * 1000}px)`;
      });
    }, 400);
  }, 20);
}

document.addEventListener('DOMContentLoaded', function () {
  $(".bongogallery").lightSlider({
    gallery: true,
    item: 2,
    loop: true,
    slideMargin: 10,
    thumbItem: 7,
    keyPress: true,
    onSliderLoad: function (el) {
      el.lightGallery({
        selector: '.bongogallery .lslide',
        download: false,
        animateThumb: true
      });
    }
  });
}, false);
document.addEventListener('DOMContentLoaded', function () {
  $(".hiacegallery").lightSlider({
    gallery: true,
    item: 2,
    loop: true,
    slideMargin: 10,
    thumbItem: 7,
    keyPress: true,
    onSliderLoad: function (el) {
      el.lightGallery({
        selector: '.hiacegallery .lslide',
        download: false,
        animateThumb: true
      });
    }
  });
}, false);
document.addEventListener('DOMContentLoaded', function () {
  $(".hiacehiroofgallery").lightSlider({
    gallery: true,
    item: 2,
    loop: true,
    slideMargin: 10,
    thumbItem: 7,
    keyPress: true,
    onSliderLoad: function (el) {
      el.lightGallery({
        selector: '.hiacehiroofgallery .lslide',
        download: false,
        animateThumb: true
      });
    }
  });
}, false);
document.addEventListener('DOMContentLoaded', function () {
  $(".equipmentgallery").lightSlider({
    gallery: true,
    item: 2,
    loop: true,
    slideMargin: 10,
    thumbItem: 7,
    keyPress: true,
    onSliderLoad: function (el) {
      el.lightGallery({
        selector: '.equipmentgallery .lslide',
        download: false,
        animateThumb: true
      });
    }
  });
}, false);

function broFountain(e) {
  for (let i = 0; i < 3; i++) {
    broFest(e);
  }
}
/*
document.addEventListener('click', broFountain);
document.addEventListener('touchstart', broFountain);
*/

/*
const wx = .2 + (Math.random() * window.innerWidth * .6);
const wy = .2 + (Math.random() * window.innerHeight * .6);

for (let i = 0; i < 20; i++) {
  broFest({
    pageX: wx + i * 2,
    pageY: wy
  });
}*/