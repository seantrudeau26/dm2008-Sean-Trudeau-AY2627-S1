// DM2008 — Activity 3b
// One Function Wonder (30 min)

// Call it several times with different values to create variation.

// Stretch: call your function inside a for loop to create a repeating pattern.

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  funk(80, 80, 80, "#eed111", "#e5c8c8");

  
  funk(160, 160, 160, "#ee1132", "#e5c8c8");
 
  
  funk(320, 320, 320, "#4cee11", "#e5c8c8");


  function funk(x, y, s, c, r) {
    push();
    fill(c);
    rect(x, y, s);
    pop();

    push();
    fill(r);
    rect((x * 3) / 4, (y * 3) / 4, s / 4);
    rect((x * 5) / 4, (y * 3) / 4, s / 4);
    pop();

    line(x / 2, y / 2, x, y / 4);
    line(x, y / 4, (x * 6) / 4, y / 2);
  
  }
}
