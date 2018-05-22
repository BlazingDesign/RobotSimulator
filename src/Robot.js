const TO_RAD = Math.PI / 180;
const ROBOT_SIZE = 5;
const WHEEL_DISTANCE = ROBOT_SIZE/2.0;

class Robot {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
      theta: 0,
    }
    this.speed = {
      left: 0,
      right: 0,
    };
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  getForwardSpeed() {
    let { left, right } = this.speed;
    return (left + right)/2;
  }

  update() {
    this.position.theta += (this.speed.left - this.speed.right)/WHEEL_DISTANCE;
    const fSpeed = this.getForwardSpeed();
    this.position.x += fSpeed * Math.cos(this.position.theta * TO_RAD);
    this.position.y += fSpeed * Math.sin(this.position.theta * TO_RAD);
  }
}

export default new Robot();