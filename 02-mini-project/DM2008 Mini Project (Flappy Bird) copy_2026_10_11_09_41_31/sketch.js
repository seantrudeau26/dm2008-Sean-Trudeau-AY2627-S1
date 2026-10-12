// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Stretch:, or a difficulty curve.

/* ----------------- Globals ----------------- */
let bird, field, flap, crash, castle;
let pipes = [];
let score = 0;
let highscore = 0;
let spawnCounter = 0;

const PIPE_SPEED = 2.5;
const SPAWN_RATE = 90;
const PIPE_GAP = 120;
const PIPE_W = 60;

let gameState = "start";

/* ----------------- Setup & Draw ----------------- */
async function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));

  field = await loadImage("Images/Field2.jpg");
  castle = await loadImage("Images/Castle.jpg");
  flap = await loadSound("Sounds/Flap.mp3");
  crash = await loadSound("Sounds/Crash.mp3");
}

function draw() {
  background(18, 22, 28);

  if (gameState == "start") {
    image(castle, 0, 0, width, height);

    push();
    fill(0, 0, 0, 100);
    rect(50, 300, 380, 40);
    rect(100, 420, 280, 40);
    pop();
    textSize(30);
    fill("#f09d28");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("Welcome to Flappy Snitch!", 240, 320);
    text("Click Mouse to Start!", 240, 440);
    return;
  }

  if (gameState == "gameover") {
    noStroke();
    fill(255, 205, 80);
    circle(mouseX, mouseY, 32);
    triangle(
      mouseX - 15,
      mouseY,
      mouseX - 35,
      mouseY + 6,
      mouseX - 10,
      mouseY - 6
    );
    textSize(30);
    fill(255);
    stroke(50);
    textAlign(CENTER, CENTER);
    text("You Lose!", 240, 320);
    text("Score: " + score, 240, 360);
    text("High Score: " + highscore, 240, 400);
    text("Click Mouse to Restart!", 240, 440);
    return;
  }

  if (gameState === "playing") {
    image(field, 0, 0, width, height);

    bird.update();

    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        crash.play();
        gameState = "gameover";
      }

      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        score = score + 1;
        if (score >= highscore) {
          highscore = score;
        }
        pipes[i].passed = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    push();
    textSize(30);
    fill(255);
    stroke(50);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);
    pop();
  }
}

/* ----------------- Input ----------------- */
function keyPressed() {
  if (key == " " || key == UP_ARROW) {
    bird.flap();
  }
}

function mousePressed() {
  if (gameState == "gameover") {
    score = 0;
    pipes = [];
    spawnCounter = 0;
    gameState = "playing";
  }
  if (gameState == "start") {
    gameState = "playing";
  }
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.flapStrength = -8.0;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    this.vel.y = this.flapStrength;
    flap.play();
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }

  show() {
    noStroke();
    fill(255, 205, 80);
    circle(this.pos.x, this.pos.y, this.r * 2);
    triangle(
      this.pos.x - 15,
      this.pos.y,
      this.pos.x - 35,
      this.pos.y + 6,
      this.pos.x - 10,
      this.pos.y - 6
    );
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill("#9a3232");
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }

  offscreen() {
    return this.x + this.w < 0;
  }

  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}
