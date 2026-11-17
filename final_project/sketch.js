let bat;
let score = 0;
let gameState = "start11";



function setup() {
  createCanvas(9/10*windowWidth, 9/10*windowHeight); //CHATGPT helped me understand how to make the canvas size dynamic to the window size
  bat = new Bat(100, windowHeight *9/10);
}

function draw() {
  background(220);

  if (gameState == "start11") {

    textSize(30);
    fill("#0e0d0d");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("Gotham Needs your help!", windowWidth / 2, windowHeight / 2 - 50);
    text("Click Mouse to Start!", windowWidth / 2, windowHeight / 2 + 50);
    return;
  }

  if (gameState == "start12") {

    textSize(30);
    fill("#0e0d0d");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("Gotham Needs your help!", windowWidth / 2, windowHeight / 2 - 50);
    text("Click Mouse to Start!", windowWidth / 2, windowHeight / 2 + 50);
    return;
  }

  if (gameState == "start13") {

    textSize(30);
    fill("#0e0d0d");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("Gotham Needs your help!", windowWidth / 2, windowHeight / 2 - 50);
    text("Click Mouse to Start!", windowWidth / 2, windowHeight / 2 + 50);
    return;
  }


  if (gameState == "dead") { }

  if (gameState == "level1") {
    bat.update();
    bat.show();
  }


  if (gameState == "level2") { }

  if (gameState == "level3") { }

  if (gameState == "win") { }
}



function mousePressed() {
  if (gameState == "dead") {
    score = 0;
    gameState = "level1";
  }
  if (gameState == "start11") {
    gameState = "start12";
  }

  if (gameState == "start12") {
    gameState = "start13";
  }

  if (gameState == "start13") {
    gameState = "level1";
  }

}



class Bat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.jumpStrength = -10;
    this.upWasDown = false; //CHAT GPT helped me create boolean variable to check if the up arrow key was pressed in the previous frame, which is used to prevent continuous jumping when the key is held down
  }

  applyForce(fy) { //CHAT GPT helped me understand how to apply force to the bat, impacted acceleration
    this.acc.y += fy;
  }

  jump() {
    if (this.pos.y >= height - this.r) { //CHAT GPT helped me create a condition where the bat can only jump when it is on the ground, preventing mid-air jumps
      this.vel.y = this.jumpStrength;
    }
  }

  update() {
    if (keyIsDown(RIGHT_ARROW)) { // CHATGPT consulted for how to make the bat move left, right, and up. AI helped me a lot with the jump function and creating conditons where Batman can only jump from ground
      this.pos.x += 3;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.pos.x -= 3;
    }
    if (keyIsDown(UP_ARROW) && !this.upWasDown) {
      this.jump();
    }
    this.upWasDown = keyIsDown(UP_ARROW);

    this.applyForce(this.gravity); //CHAT GPT used to apply physics requiered for bat to jump
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y >= height - this.r) { //CHAT GPT helped aided in creating a condition where the bat cannot fall through the ground
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }



  show() {
    noStroke();
    fill(255, 205, 80);
    circle(this.pos.x, this.pos.y, this.r * 2);

  }
}





///Additonal AI usage: finding errors in code and cleaning up problems