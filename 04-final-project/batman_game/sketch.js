let punch, jump, win, bat, avatar, jump_posr, jump_posl, l_attack, r_attack, l_move, r_move, bg1, bg2, bg3, bg01, bg02, font, lose, thug_mover, thug_movel, thug_attackr, thug_attackl, thug_dead, clown_mover, clown_movel, clown_attackr, clown_attackl, clown_dead, joker_mover, joker_movel, joker_attackr, joker_attackl, joker_dead, joker, intro_music, level1_music, level2_music, level3_music, win_music, lose_music;
let gameState = "start11";
let levelStartTime = 0; //CHAT GPT helped me understand how to use a variable to keep track of the time when the level started, which is used to determine when to transition to the next level.
let thugs = []; //CHATGPT reminded me to use arrays to store to make easier. 
let clowns = [];

async function setup() {
  createCanvas(windowWidth, windowHeight); //CHATGPT helped me understand how to make the canvas size dynamic to the window size
  bat = new Bat(100, windowHeight);
  levelStartTime = millis(); //CHAT GPT told me to use millis to keep track of time. 


  for (let i = 0; i < 10; i++) { //CHATGPT helped me make for loop to make the thugs appearing on screen have more efficient code.
    thugs.push(new Thug(-100 - i * 300, windowHeight, 1));
    thugs.push(new Thug(windowWidth + 100 + i * 300, windowHeight, 1));
  }

  for (let i = 0; i < 10; i++) { //Applied my learning from previous AI help. 
    clowns.push(new Thug(-100 - i * 300, windowHeight, 2));
    clowns.push(new Thug(windowWidth + 100 + i * 300, windowHeight, 2));
  }

  joker = new Thug(500, windowHeight, 3);

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
  win = await loadImage("assets/win.png");//AI generated picture
  thug_mover = await loadImage("assets/thug_facing_right.png"); //CHAT GPT generated the images for the thug
  thug_movel = await loadImage("assets/thug_facing_left.png");
  thug_attackr = await loadImage("assets/thug_attacking_right.png");
  thug_attackl = await loadImage("assets/thug_attacking_left.png");
  thug_dead = await loadImage("assets/thug_dead.png");
  clown_mover = await loadImage("assets/clown_r.png");//CHAT GPT generated the images for the clown
  clown_movel = await loadImage("assets/clown_l.png");
  clown_attackr = await loadImage("assets/clown_punchr.png");
  clown_attackl = await loadImage("assets/clown_punchl.png");
  clown_dead = await loadImage("assets/clown_dead.png");
  joker_mover = await loadImage("assets/joker_r.png");//CHAT GPT generated images for joker
  joker_movel = await loadImage("assets/joker_l.png");
  joker_attackr = await loadImage("assets/joker_attackr.png");
  joker_attackl = await loadImage("assets/joker_attackl.png");
  joker_dead = await loadImage("assets/joker_dead.png");
  punch = await loadSound("assets/punch.m4a");
  jump = await loadSound("assets/jump.m4a");
  font = await loadFont("assets/font.ttf"); //CHAT GPT helped me implement cool fonts to make the game better.
  intro_music = await loadSound("assets/intro.mp3");//CHAT GPT helped inspire themes for music
  level1_music = await loadSound("assets/level1.mp3");
  level2_music = await loadSound("assets/level2.mp3");
  level3_music = await loadSound("assets/level3.mp3");
  win_music = await loadSound("assets/win.mp3");
  lose_music = await loadSound("assets/lose.mp3");
}


function draw() {

  updateMusic();

  if (gameState == "start11") {
    image(bg01, 0, 0, windowWidth, windowHeight);
    textSize(75);
    textFont(font);
    fill("#f9f6f6");
    stroke(50);
    textAlign(CENTER, CENTER);
    text("BATMAN: SAVING GOTHAM", windowWidth / 2, windowHeight / 5);
    textSize(30);
    text("Click the mouse to continue!", windowWidth / 2, windowHeight / 2 + 200);
    return;//CHAT GPT told me to use return to stop the draw function from continuing to run when the gameState is "start11", which is used to prevent the game from starting before the player is ready.
  }

  if (gameState == "start12") {
    image(bg02, 0, 0, windowWidth, windowHeight);
    text("Gotham Needs your help! Take out the bad guys and restore justice!", windowWidth / 2, windowHeight / 10);
    text("Click Mouse to Start!", windowWidth / 2, windowHeight / 2 + 200);
    return;
  }

  if (gameState == "dead") {
    image(lose, 0, 0, windowWidth, windowHeight);
    text("GAME OVER", windowWidth / 2, windowHeight / 8); //CHAT GPT found problem with original rectangle and reccomended this course of action.
    text("Gotham City is destroyed", windowWidth / 2, windowHeight / 4);
    text("Click mouse to restart", windowWidth / 2, windowHeight - 100);
    return;
  }

  if (gameState == "level1") {
    image(bg1, 0, 0, windowWidth, windowHeight);
    push();
    textSize(20);
    text("Health: " + bat.health, windowWidth - 150, 50); //CHAT GPT told me I could just use bat.health to represent the health.
    pop();
    bat.update();
    bat.show();


    if (millis() - levelStartTime >= 15000) { //CHAT GPT helped me how to apply time constrain so that the thugs appear after the instructions.
      for (let thug of thugs) { //CHAT GPT helped me understand how to use a for loop to iterate through the array of thugs and call the update and show methods for each thug. It helped in the set up of the thugs array also.
        thug.update();
        thug.show();
      }
    }

    bat.spaceWasDown = keyIsDown(" "); //CHAT GPT helped me understand how to use the keyIsDown() function to check if the spacebar key is pressed, which is used to prevent continuous attacking when the key is held down


    if (millis() - levelStartTime < 2500) { //CHAT GPT helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
      textSize(50);
      text("Use the Arrow Keys to Move", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 5000) {
      text("Use the spacebar to attack", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 7500) {
      text("Defeat all the enemies to win!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 10000) {
      text("Get ready!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 12500) {
      text("Level 1: Gotham Streets", windowWidth / 2, windowHeight / 8);
    }

    if (thugs.every(thug => thug.health <= 0)) {//CHAT GPT helped me work through the logic of checking if all thugs are dead and transitioning to the next level. It helped me understand how to use the every() function to check if all elements in an array meet a certain condition.
      gameState = "level2";
      levelStartTime = millis();
      bat.health = 50;
    }
  }

  if (gameState == "level2") {
    image(bg2, 0, 0, windowWidth, windowHeight);
    push();
    textSize(20);
    text("Health: " + bat.health, windowWidth - 150, 25);
    pop();
    bat.update();
    bat.show();

    if (millis() - levelStartTime < 2500) {
      text("Well done!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 5000) {
      text("Gotham City still needs your help!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 7500) {
      text("Level 2: The Roof", windowWidth / 2, windowHeight / 8);
    }


    if (millis() - levelStartTime >= 8000) { // Applied my learning from previous AI help.
      for (let thug of clowns) {
        thug.update();
        thug.show();
      }
    }

    bat.spaceWasDown = keyIsDown(" ");

    if (clowns.every(thug => thug.health <= 0)) {
      gameState = "level3";
      levelStartTime = millis();
      bat.health = 50;
    }
  }

  if (gameState == "level3") {
    image(bg3, 0, 0, windowWidth, windowHeight);
    push();
    textSize(20);
    text("Health: " + bat.health, windowWidth - 150, 25);
    pop();

    bat.update();
    bat.show();


    if (millis() - levelStartTime < 2500) {
      text("Good job!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 5000) {
      text("One enemy left!", windowWidth / 2, windowHeight / 8);
    }
    else if (millis() - levelStartTime < 7500) {
      text("Level 3: The Joker", windowWidth / 2, windowHeight / 8);

    }
    if (millis() - levelStartTime >= 8000) {
      joker.update();
      joker.show();
    }

    bat.spaceWasDown = keyIsDown(" ");

    if (joker.health <= 0 && millis() - joker.deathtime >= 2500) { //CHAT GPT helped me realize I can use deathtime to delay the time before moving to level 3
      gameState = "win";
    }
  }

  if (gameState == "win") {
    image(win, 0, 0, windowWidth, windowHeight);
    text("You win!", windowWidth / 2, windowHeight / 8);
    text("Gotham City is saved!", windowWidth / 2, windowHeight / 4);
  }
}



function mousePressed() { //CHAT GPT told me to use else if, instead of just if statements, to make sure that the gameState changes correctly when the mouse is pressed.
  
userStartAudio();


  if (gameState == "dead") {
    bat = new Bat(100, windowHeight); //CHAT GPT helped me work through the following. This made it so when I restrarted, the game would actually restart. Needed to spawn in characters again. 
    thugs = [];
    clowns = [];

    for (let i = 0; i < 10; i++) {
      thugs.push(new Thug(-100 - i * 300, windowHeight, 1));
      thugs.push(new Thug(windowWidth + 100 + i * 300, windowHeight, 1));
    }

    for (let i = 0; i < 10; i++) {
      clowns.push(new Thug(-100 - i * 300, windowHeight, 2));
      clowns.push(new Thug(windowWidth + 100 + i * 300, windowHeight, 2));
    }
    joker = new Thug(500, windowHeight, 3);
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
    this.health = 50;
    this.touchtime = 0; //CHAT GPT helped me create a variable to keep track of the time when the bat was last touched by an enemy, which is used to prevent the bat from taking damage too quickly.
    this.spaceWasDown = false; //CHAT GPT helped me create boolean variable to check if the spacebar key was pressed in the previous frame, which is used to prevent continuous attacking when the key is held down
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
    if (keyIsDown(" ") && !this.spaceWasDown) {//CHAT GPT reminded me how to implement sound effects, and setting a condition so the sound effect only plays twice
      punch.play();
    }

    if (keyIsDown(UP_ARROW) && !this.upWasDown) {
      if (this.pos.y >= height - this.r) {
        this.jump();
        jump.play();
      }
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




    if (millis() - levelStartTime >= 15000) { //CHAT GPT helped me put my concept into action, it worked on checking if enemies are in range and if cause damage. 
      if (gameState == "level1") {
        for (let thug of thugs) {
          if (abs(this.pos.x - thug.pos.x) <= 80 && millis() - this.touchtime > 500 && thug.health > 0) { //CHAT GPT helped me understand how to use the abs() function to determine the distance between the bat and the thug, which is used to determine if the thug should attack or move towards the bat. It also helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
            this.health -= 1;
            this.touchtime = millis();
          }
        }
      }
    }
    if (millis() - levelStartTime >= 8000) { // Used previous AI help to apply the same logic as above for level 2.
      if (gameState == "level2") {
        for (let thug of clowns) {
          if (abs(this.pos.x - thug.pos.x) <= 80 && millis() - this.touchtime > 500 && thug.health > 0) { //CHAT GPT helped me understand how to use the abs() function to determine the distance between the bat and the thug, which is used to determine if the thug should attack or move towards the bat. It also helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
            this.health -= 1;
            this.touchtime = millis();
          }
        }
      }
    }
    if (gameState == "level3" && millis() - levelStartTime >= 8000) { //CHAT GPT reminded me of using level start time to ensure batman only takes damage once the joker has appeared. 
      if (abs(this.pos.x - joker.pos.x) <= 80 && millis() - this.touchtime > 500 && joker.health > 0) {
        this.health -= 1;
        this.touchtime = millis();
      }
    }

    if (this.health <= 0) {
      gameState = "dead";
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


class Thug { //CHAT GPT worked with me to create Thug class. It helped me check my work and ensure code was working properly, and suggesting alternatives. It did not simply tell me how to do it, we worked and I answered questions. Big points of emphasis on expressing the differences depeding on the facing of the thug and if the bat is close enough to attack. Also, we worked on how to make the thug move towards the bat and how to make the thug take damage when the bat attacks. I understood it conceptually and AI helped me implement it. I also learned how to use the abs() function to determine the distance between the bat and the thug, which is used to determine if the thug should attack or move towards the bat.
  constructor(x, y, level) {
    this.pos = createVector(x, y);
    this.level = level;
    this.facing = "left";
    if (this.level == 3) {
      this.health = 20;
    }
    else {
      this.health = 2;
    }
    this.deathtime = 0; //CHAT GPT helped me understand how to use a variable to keep track of the time when the thug died, which is used to determine when to transition to the next level.
  }

  update() {
    if (this.health <= 0) {
      return;
    }
    if (bat.pos.x > this.pos.x) {
      this.facing = "right";
      if (abs(bat.pos.x - this.pos.x) > 80) {
        if (this.level == 3) {
          this.pos.x += 3;
        }
        else {
          this.pos.x += 2;
        }
      }
    }
    if (bat.pos.x < this.pos.x) {
      this.facing = "left";
      if (abs(bat.pos.x - this.pos.x) > 80) {
        if (this.level == 3) {
          this.pos.x -= 3;
        }
        else {
          this.pos.x -= 2;
        }
      }
    }

    if ((keyIsDown(" ") && abs(bat.pos.x - this.pos.x) <= 80 && !bat.spaceWasDown)) { //the last condition checks if the spacebar was not pressed in the previous frame, which is used to prevent continuous attacking when the key is held down. Chat GPT helped me understand this. 
      this.health -= 1;
    }
    if (this.health <= 0) {
      this.deathtime = millis(); //CHAT GPT helped me understand how to use the millis() function to keep track of time and show text for a specific duration.
    }
  }

  show() {
    if (this.health <= 0) {
      if (millis() - this.deathtime < 2500) { //CHAT GPT told me to move to the beginning since other conditions will be met. 
        if (this.level == 1) {
          image(thug_dead, this.pos.x, this.pos.y - 150, 100, 200);
        }
        if (this.level == 2) {
          image(clown_dead, this.pos.x, this.pos.y - 100, 70, 150);
        }
        if (this.level == 3) {
          image(joker_dead, this.pos.x, this.pos.y - 140, 90, 200);
        }
      }
      return;
    }
    else if (this.facing == "right" && abs(bat.pos.x - this.pos.x) <= 80) {
      if (this.level == 1) { //CHAT GPT helped me apply an if statement to change the appearance of the sprite.
        image(thug_attackr, this.pos.x, this.pos.y - 210, 75, 250);
      }
      if (this.level == 2) {
        image(clown_attackr, this.pos.x, this.pos.y - 170, 100, 200);
      }
      if (this.level == 3) {
        image(joker_attackr, this.pos.x, this.pos.y - 180, 100, 200);
      }
    } else if (this.facing == "left" && abs(bat.pos.x - this.pos.x) <= 80) {
      if (this.level == 1) {
        image(thug_attackl, this.pos.x, this.pos.y - 210, 75, 250);
      }
      if (this.level == 2) {
        image(clown_attackl, this.pos.x, this.pos.y - 170, 100, 200);
      }
      if (this.level == 3) {
        image(joker_attackl, this.pos.x, this.pos.y - 160, 100, 200);
      }
    }
    else if (this.facing == "right") {
      if (this.level == 1) {
        image(thug_mover, this.pos.x, this.pos.y - 160, 50, 200);
      }
      if (this.level == 2) {
        image(clown_mover, this.pos.x, this.pos.y - 160, 75, 200);
      }
      if (this.level == 3) {
        image(joker_mover, this.pos.x, this.pos.y - 180, 75, 200);
      }
    }
    else if (this.facing == "left") {
      if (this.level == 1) {
        image(thug_movel, this.pos.x, this.pos.y - 160, 50, 200);
      }
      if (this.level == 2) {
        image(clown_movel, this.pos.x, this.pos.y - 160, 75, 200);
      }
      if (this.level == 3) {
        image(joker_movel, this.pos.x, this.pos.y - 180, 75, 200);
      }
    }
  }
}



function updateMusic() { //CHAT GPT consulted to make this function. Needed to ensure that the music does not play again every frame and it sounds good. 

  if (gameState == "start11" || gameState == "start12") {
    if (!intro_music.isPlaying()) {
      level1_music.stop();
      level2_music.stop();
      level3_music.stop();
      win_music.stop();
      lose_music.stop();
      intro_music.play();
    }
  }

  else if (gameState == "level1") {
    if (!level1_music.isPlaying()) {
      intro_music.stop();
      level2_music.stop();
      level3_music.stop();
      win_music.stop();
      lose_music.stop();
      level1_music.play();
    }
  }

  else if (gameState == "level2") {
    if (!level2_music.isPlaying()) {
      intro_music.stop();
      level1_music.stop();
      level3_music.stop();
      win_music.stop();
      lose_music.stop();
      level2_music.play();
    }
  }


  else if (gameState == "level3") {
    if (!level3_music.isPlaying()) {
      intro_music.stop();
      level1_music.stop();
      level2_music.stop();
      win_music.stop();
      lose_music.stop();
      level3_music.play();
    }
  }
  else if (gameState == "win") {
    if (!win_music.isPlaying()) {
      intro_music.stop();
      level1_music.stop();
      level2_music.stop();
      level3_music.stop();
      lose_music.stop();
      win_music.play();
    }
  }
  else if (gameState == "dead") {
    if (!lose_music.isPlaying()) {
      intro_music.stop();
      level1_music.stop();
      level2_music.stop();
      level3_music.stop();
      win_music.stop();
      lose_music.play();
    }
  }

}



///Additonal AI usage: finding errors in code and cleaning up problems, random trouble shoots with downloading github, changing orientaiton of images, general input of code and giving me feedback.