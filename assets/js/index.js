function toggleItem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function(e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove('blank');
        } else if (current.classList.contains('blank') === true) {
          current.classList.remove('blank');
        } else {
          current.classList.add('blank')
        }
      }
      e.preventDefault();
    });
  };
}
toggleItem(document.querySelectorAll('.wrapper'));
