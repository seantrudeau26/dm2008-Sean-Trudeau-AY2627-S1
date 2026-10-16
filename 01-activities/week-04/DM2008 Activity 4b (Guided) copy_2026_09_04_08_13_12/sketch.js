// DM2008 — Activity 4b [Guided]
// Objects in Motion (50 min)


let agents = [];
const NUM_START = 12;

function setup() {
  createCanvas(600, 400);
  noStroke();

  for (let i = 0; i < NUM_START; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(1,30);
    let speedX = random(-6, 6);
    let speedY = random(-6, 6);
    agents.push(new Agent(x, y, sz, speedX, speedY));
    
  }
}

function draw() {
  background(230);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].show();
    agents[i].grow();

    if (agents[i].sz > 100){
      agents.splice(i,1)
    }
  }
}

function mousePressed() {
  let sz = random(5,15);
  let speedX = random(-8, 8);
  let speedY = random(-8, 8);
  agents.push(new Agent(mouseX, mouseY, sz, speedX, speedY));
}

function keyPressed() {
  if (key == "C" || key == "c") {
    agents = [];
  }
}

class Agent {
  constructor(x, y, sz, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.dx = speedX;
    this.dy = speedY;
    this.col = (random(255),random(255),random(255));
    
    // a color value that will change over time
    // What else might your agent need to know about itself?
  }

  update() {
    // Position changes by speed each frame — can you see why?
    this.x += this.dx;
    this.y += this.dy;

    // This is a property changing over time — try changing size or speed instead
    this.col = (this.col + 1) % 255;

    if (this.x > width) {
      this.dx = this.dx * (-1);
    }
    if (this.x < 0) {
      this.dx = this.dx * (-1);
    }
    if (this.y > height) {
      this.dy = this.dy * (-1);
    }
    if (this.y < 0) {
      this.dy = this.dy * (-1);
    }
  }

  show() {
    // this.col drives the color shift — how could you use your other properties here?
    fill(this.col, random(255), random(255));
    ellipse(this.x, this.y, this.sz);
  }

  grow(){
    if (this.sz <=100){
      this.sz += 0.5
      
    }
  }

  
}
