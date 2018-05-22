import paper from 'paper';
import Robot from './Robot';
import User from './User';

const TO_RAD = Math.PI / 180;
const ROBOT_SIZE = [50, 75];

export default class Renderer {
  constructor() {
    this.map = new paper.Raster('map');
    this.map.position = paper.view.center;

    this.reset();

    this.user = new User();

    this.createRobot();

    paper.view.draw();

    paper.view.onFrame = this.onFrame.bind(this);
    paper.view.onKeyDown = this.onKeyDown.bind(this);
    paper.view.onKeyUp = this.onKeyUp.bind(this);
  }

  reset() {
    Robot.position.x = 25;
    Robot.position.y = 250;
  }

  createRobot() {
    this.robotViz = new paper.Group();
    this.robotViz.applyMatrix = false;
    this._robot = new paper.Path.Rectangle({
        size: ROBOT_SIZE,
        fillColor: 'green',
    });
    this._robot.opacity = 0.95;

    this._sensor_left = new paper.Path.Circle(ROBOT_SIZE[0], ROBOT_SIZE[1], 10)
    this._sensor_left.fillColor = "red";
    this._sensor_left.opacity = 0.5;

    this._sensor_right = new paper.Path.Circle(ROBOT_SIZE[0], 0, 10)
    this._sensor_right.fillColor = "red";
    this._sensor_right.opacity = 0.5;

    this.robotViz.addChild(this._robot)    
    this.robotViz.addChild(this._sensor_left)
    this.robotViz.addChild(this._sensor_right)
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

  _getSensorsReading() {
    let left_area = new paper.Path.Circle(this.robotViz.localToGlobal(this._sensor_left.position), 10);
    let left = this.map.getAverageColor(left_area);
    left = left ? left.lightness : 0;

    let right_area = new paper.Path.Circle(this.robotViz.localToGlobal(this._sensor_right.position), 10);
    let right = this.map.getAverageColor(right_area);
    right = right ? right.lightness : 0;
    return { left, right }
  }

  onFrame(event) {
    this.user.update(Robot, this._getSensorsReading())
    Robot.update();
    let { x, y, theta } = Robot.position;
    this.robotViz.position = new paper.Point(x, y);
    this.robotViz.rotation = theta;

    let marker = new paper.Path.Circle(this.robotViz.position, 2);
    marker.fillColor = 'blue';
  }
}