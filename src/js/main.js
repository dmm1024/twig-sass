const btns = document.querySelector('.top__btns');

console.log(btns);

btns.addEventListener('click', ev => {
  for(let i = 0; i < btns.children.length; i++) {
    if(ev.target === btns.children[i]) {
      console.log(i);
    }
  }
})