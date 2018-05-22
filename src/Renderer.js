import paper from 'paper';
import Robot from './Robot';

export default class Renderer {
  constructor() {
    this.robotViz = new paper.Path.Rectangle({
        size: [50, 100],
        fillColor: 'green',
    });
    this.robotViz.applyMatrix = false;
    paper.view.draw();

    paper.view.onFrame = this.onFrame.bind(this);
    paper.view.onKeyDown = this.onKeyDown.bind(this);
    paper.view.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyDown(event) {
    switch(event.key) {
      case 'w':
        Robot.setSpeed({ left: 3, right: 3 });
        break;
      case 'a':
        Robot.setSpeed({ left: -3, right: 3 });
        break;
      case 's':
        Robot.setSpeed({ left: -3, right: -3 });
        break;
      case 'd':
        Robot.setSpeed({ left: 3, right: -3 });
        break;
    }
  }

  onKeyUp(event) {
    Robot.setSpeed({ left: 0, right: 0 });
  }

  onFrame(event) {
    Robot.update();
    let { x, y, theta } = Robot.position;
    this.robotViz.position = new paper.Point(x, y);
    this.robotViz.rotation = theta;
  }
}