let bat, avatar, jump_posr, jump_posl, l_attack, r_attack, l_move, r_move, bg1, bg2, bg3, bg01, bg02, font, lose;
let gameState = "start11";
let levelStartTime = 0; //CHAT GPT helped me understand how to use a variable to keep track of the time when the level started, which is used to determine when to transition to the next level.



async function setup() {
  createCanvas(windowWidth, windowHeight); //CHATGPT helped me understand how to make the canvas size dynamic to the window size
  bat = new Bat(100, windowHeight);

  avatar = await loadImage("assets/avatar.png");
  jump_posr = await loadImage("assets/jumpyr.png");
  jump_posl = await loadImage("assets/jumpyl.png");
  l_attack = await loadImage("assets/lpunch.png");
  r_attack = await loadImage("assets/rpunch.png");
  l_move = await loadImage("assets/lrun.png");
  r_move = await loadImage("assets/rrun.png");
  bg1 = await loadImage("assets/l1.jpg");
  bg2 = await loadImage("assets/l2.jpg");
  bg3 = await loadImage("assets/l3.jpeg");
  bg01 = await loadImage("assets/intro_pic.jpg");
  bg02 = await loadImage("assets/intro_2.jpg");
  lose = await loadImage("assets/lose.jpg");
  font = await loadFont("assets/font.ttf"); //CHAT GPT helped me implement cool fonts to make the game better.

}

function draw() {

  if (gameState == "start11") {
    image(bg01, 0, 0, windowWidth, windowHeight);

    textSize(75);
    textFont(font);
    fill("#f9f6f6");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("BATMAN: SAVING GOTHAM", windowWidth / 2, windowHeight / 5);
    textSize(30);
    text("Click Mouse to Continue!", windowWidth / 2, windowHeight / 2 + 200);
    return;
  }

  if (gameState == "start12") {
    image(bg02, 0, 0, windowWidth, windowHeight);
    textSize(30);
    textFont(font);
    fill("#ede7e7");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("Gotham Needs your help! Take out the bad guys and restore justice!", windowWidth / 2, windowHeight / 10);
    text("Click Mouse to Start!", windowWidth / 2, windowHeight / 2 + 200);
    return;
  }




  if (gameState == "dead") {
    image(lose, 0, 0, windowWidth, windowHeight);

    fill("#ede7e722");
    rect(windowWidth / 2 - 100, windowHeight / 2 + 200, windowWidth / 2 + 100, windowHeight / 2 - 200);
  }

  if (gameState == "level1") {
    image(bg1, 0, 0, windowWidth, windowHeight);
    bat.update();
    bat.show();

    if (millis() - levelStartTime < 2500) { //CHAT GPT helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
      textSize(50);
      text("Use the Arrow Keys to Move", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 5000) {
      text("Use the Spacebar to Attack", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 7500) {
      text("Defeat all the Enemies to Win!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 10000) {
      text("Get Ready!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 12500) {
      text("Level 1: Gotham Streets", windowWidth / 2, windowHeight / 8);
    }
  }




  if (gameState == "level2") {
    image(bg2, 0, 0, windowWidth, windowHeight);
    bat.update();
    bat.show();
  }

  if (gameState == "level3") {
    image(bg3, 0, 0, windowWidth, windowHeight);
    bat.update();
    bat.show();

  }

  if (gameState == "win") { }
}



function mousePressed() { //CHAT GPT told me to use else if, instead of just if statements, to make sure that the gameState changes correctly when the mouse is pressed.
  if (gameState == "dead") {
    gameState = "level1";
    levelStartTime = millis(); //CHAT GPT helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
  }
  else if (gameState == "start11") {
    gameState = "start12";
  }

  else if (gameState == "start12") {
    gameState = "level1";
    levelStartTime = millis(); //Same help as above
  }
}



class Bat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16;
    this.gravity = 0.45;
    this.jumpStrength = -14;
    this.facing = "right"; //CHAT GPT assisted in creating a facing variable to determine which direction the bat is facing, which is used to change the image of the bat based on the direction it is moving
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
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.pos.x < windowWidth - 70) { // CHATGPT consulted for how to make the bat move left, right, and up. AI helped me a lot with the jump function and creating conditons where Batman can only jump from ground
        this.pos.x += 5;
        this.facing = "right";
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      if (this.pos.x > -25) {
        this.pos.x -= 5;
        this.facing = "left";
      }
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
    if (keyIsDown(UP_ARROW) && this.facing == "right") {
      image(jump_posr, this.pos.x, this.pos.y - 160, 100, 200);
    } else if (keyIsDown(UP_ARROW) && this.facing == "left") {
      image(jump_posl, this.pos.x, this.pos.y - 160, 100, 200);
    } else if (keyIsDown(LEFT_ARROW)) {
      image(l_move, this.pos.x, this.pos.y - 160, 100, 200);
    } else if (keyIsDown(RIGHT_ARROW)) {
      image(r_move, this.pos.x, this.pos.y - 160, 100, 200);
    } else if (keyIsDown(" ") && this.facing == "right") {
      image(r_attack, this.pos.x, this.pos.y - 160, 100, 200);
    } else if (keyIsDown(" ") && this.facing == "left") {
      image(l_attack, this.pos.x, this.pos.y - 160, 100, 200);
    } else {
      image(avatar, this.pos.x, this.pos.y - 160, 100, 200);
      //CHAT GPT helped me workthrough using this.pos.x/y to make the image move. Also, I knew that the images needed to change based on the action and that if/else statements would be used, but CHAT GPT helped me make this happen. 

    }
  }

}

class Thug {
  constructor(x, y, level) {
    this.pos = createVector(x, y);
    this.level = level;
    this.facing = "left";
  }


    update(){
      if (bat.pos.x > this.pos.x) {
        this.facing = "right";
        if (abs(bat.pos.x - this.pos.x) > 80) {
          this.pos.x += 2;
        }
      }
      if (bat.pos.x < this.pos.x) {
        this.facing = "left";
        if (abs(bat.pos.x - this.pos.x) > 80) {
          this.pos.x -= 2;
        }
      }
    }


  }


    show(){


    }
 
  }
}
    
    

///Additonal AI usage: finding errors in code and cleaning up problems, random trouble shoots with downloading github, changing orientaiton of images