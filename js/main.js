function loadImage(id, targetId) {

  var el = document.getElementById(id);


  var targetEl = targetId ? document.getElementById(targetId) : el;


  var imageToLoad;

  if (el.dataset.image) {
    imageToLoad = el.dataset.image;
  } else if (typeof el.currentSrc === 'undefined') {
    imageToLoad = el.src;
  } else {
    imageToLoad = el.currentSrc;
  }

  if (imageToLoad) {
    var img = new Image();
    img.src = imageToLoad;
    img.onload = function() {
      targetEl.classList.add('is-loaded');
    };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadImage('wallpaper');
  loadImage('pictureImage', 'picture');
});

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 500;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 300;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #0597E3 }";
  document.body.appendChild(css);
};