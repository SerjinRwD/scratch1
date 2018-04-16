/*
    = Canvas painting
    == Using images
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    == Compositing and clipping
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing
    == Compositing example
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing/Example
    = Brush positing
    == Element position
    https://www.w3schools.com/jsref/prop_element_offsettop.asp
    https://www.w3schools.com/jsref/prop_element_offsetleft.asp
    == Mouse position
    https://www.w3schools.com/jsref/dom_obj_event.asp (see "MouseEvent Object") 
*/

(() => {
  'use strict'

  let c = document.getElementById('c1');
  let ctx = c.getContext('2d');

  let divOutput = document.getElementById('output');
  let divScratch = document.getElementById('scratch');

  let isPaiting = false;
  let brush = new Image();
  brush.src = 'content/brush.png';

  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 200, 100);

  let filled = () => {

      let data = ctx.getImageData(0, 0, 200, 100).data;
      let i, net = 0;

      for(i = 0; i < data.length; i += 4) {
          net += data[i + 3] > 0 ? 1 : 0;
      }

      return (net / (200 * 100)) * 100;

  };

  let erase = (_brush, _x, _y) => {
      let op = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = 'destination-out';
      
      ctx.drawImage(_brush, _x, _y);

      ctx.globalCompositeOperation = op;
  };
  
  c.onmousedown = (e) => {
      isPaiting = true;
      erase(brush, e.pageX - divScratch.offsetLeft - 12, e.pageY - divScratch.offsetTop - 12);
      divOutput.textContent = "Filled: " + filled();
  }

  c.onmouseup = () => isPaiting = false;

  c.onmousemove = (e) => {
      if(!isPaiting) {
          return;
      }

      erase(brush, e.pageX - divScratch.offsetLeft - 12, e.pageY - divScratch.offsetTop - 12);

      divOutput.textContent = "Filled: " + filled();
  };

})();