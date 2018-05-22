import paper from 'paper';
import Renderer from './Renderer'

var canvas = document.getElementById('frame');
canvas.width = 500;
canvas.height = 500;
paper.setup(canvas);

const renderer = new Renderer();