const btns = document.querySelector('.top__btns');
const tabs = document.querySelectorAll('.tab');

btns.addEventListener('click', ev => {
  for(let i = 0; i < btns.children.length; i++) {
    tabs[i].classList.add('hidden');
    btns.children[i].classList.contains('top__btn--active')
      && btns.children[i].classList.remove('top__btn--active');
    if(ev.target === btns.children[i]) {
      tabs[i].classList.remove('hidden');
      btns.children[i].classList.add('top__btn--active');
    }
  }
});