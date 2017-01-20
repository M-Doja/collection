'use strict';

var mySiema = new Siema();
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
prev.addEventListener('click', function () {
    return mySiema.prev();
});
next.addEventListener('click', function () {
    return mySiema.next();
});

    // listen for keydown event
document.addEventListener('keydown', (e) => {
  // if it's left arrow key
  if (e.keyCode === 37) {
    mySiema.prev()
  }
  // if it's right arrow key
  else if (e.keyCode === 39) {
    mySiema.next()
  }
})
