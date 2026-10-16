// DM2008 — Activity 5a [Guided]
// A vector stores position and movement together — cleaner than separate x and y variables.
// Your job is to get two balls moving, then detect and respond to their collision.


let balls = [];

function setup() {
  createCanvas(400, 400);
  // Create two balls at different starting positions
  balls.push(new Ball(100, 200));
  balls.push(new Ball(300, 200));
}

function draw() {
  background(230);

  // Check collision between the two balls
  // dist() measures the distance between their centers
  // They overlap when that distance is less than the sum of their radii

  let d = dist(balls[0].pos.x, balls[0].pos.y, balls[1].pos.x, balls[1].pos.y);
  let colliding = d < balls[0].r + balls[1].r; // true when the balls overlap, false otherwise

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show(colliding);
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-10, 10), random(-10, 10));
    this.r = 30;
    this.wasColliding = false;
  }

  move() {
    // Adding the velocity vector to position moves the ball each frame
    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.x < 0) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y > height) {
      this.vel.y = this.vel.y * -1;
    }
    if (this.pos.y < 0) {
      this.vel.y = this.vel.y * -1;
    }
  }

  show(colliding) {
    if (colliding) {
      fill(random(255), random(255), random(255));
      stroke(200);
      ellipse(this.pos.x, this.pos.y, this.r *4);
      this.vel.x = this.vel.x * -1;
    } else {
      fill(100, 180, 220);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.r*3);
    }
  }
}
