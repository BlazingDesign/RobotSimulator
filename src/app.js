import paper from 'paper';
import Renderer from './Renderer'

let canvas = document.getElementById('frame');
canvas.width = 1000;
canvas.height = 500;
paper.setup(canvas);

const renderer = new Renderer();



document.getElementById("run").addEventListener("click", function() {
  let code = document.getElementById('user_code').value;
  renderer.reset();
  eval("window.user = " + code)
});