export default class User {
  update(robot, sensors) {
    /*let right, left;
    if(sensors.left > 0.5)
      right = 2;
    else
      right = -2;
    if(sensors.right > 0.5)
      left = 2;
    else
      left = -2;
    robot.setSpeed({ left, right }) */

    console.log(window.user)
    if(window.user)
      window.user(robot, sensors)
  }
}
