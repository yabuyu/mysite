'use strict'; /* 厳密なエラーチェック */

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul'); /**HTML要素の取得。マッチする最初の１つだけ取得。全部取得するにはquerySelectorAll() */
  const slides = ul.children;
  const dots = [];
  let currentIndex = 0;

  function updateButtons(){
    prev.classList.remove('hidden')
    next.classList.remove('hidden')
    
    if (currentIndex===0){
      prev.classList.add('hidden');
    }
    if (currentIndex===slides.length -1 ){
      next.classList.add('hidden');
    }
  }

  function moveSlides(){
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  function setupDots(){
    for (let i = 0; i < slides.length; i++){
      const button = document.createElement('button');
      button.addEventListener('click', ()=>{
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
      document.querySelector('nav').appendChild(button);
    }
    dots[0].classList.add('current');
  }

  function updateDots(){
    dots.forEach(dot => {
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current');
  }

  updateButtons();
  setupDots();

  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });

  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  window.addEventListener('resize',()=>{
    moveSlides();
  });
  
  // Tabについて、記載。
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');
  menuItems.forEach(clickedItem => { 
    clickedItem.addEventListener('click', e => {
      e.preventDefault();

      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      clickedItem.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(clickedItem.dataset.id).classList.add('active');
      });
  });

  // Modalについて、記載。
  const open=document.getElementById('open');
  const close=document.getElementById('close');
  const modal=document.getElementById('modal');
  const mask=document.getElementById('mask');

  open.addEventListener('click',()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });

  close.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click',()=>{
    // modal.classList.add('hidden');
    // mask.classList.add('hidden');
    close.click(); /* closeをクリックした時と同じ処理 */
  });

  // FAQについて、記載。
  const dts=document.querySelectorAll('dt'); 

  dts.forEach(dt =>{
    dt.addEventListener('click',()=>{
      dt.parentNode.classList.toggle('appear') /* toggleとは？？？ */
      
      dts.forEach(el =>{ /* 全ての要素という意味でelと指定。 */
        if (dt != el){
          el.parentNode.classList.remove('appear');
        }
      });
    });
  });



}