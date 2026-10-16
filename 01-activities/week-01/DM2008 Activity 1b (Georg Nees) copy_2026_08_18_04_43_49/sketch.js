// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;

function setup() {
  createCanvas(250, 800)
  background(0,255,70);
}

function draw() {
  
  x = random(width)+1;
  y = random(height);
  w = random(0, 50);
  
  // background(240,40);
  
  stroke(200);
  strokeWeight(random(0.5, 10));
  noFill();
  ellipse(x,y,w,w);
}

function kePressed() {
    saveCanvas("activity1b-image", "jpg");
}