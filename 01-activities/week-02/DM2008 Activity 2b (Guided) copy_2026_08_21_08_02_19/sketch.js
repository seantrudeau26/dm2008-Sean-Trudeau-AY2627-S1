// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(170);

  noStroke()

  for (let i = 0; i < width; i += 50) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      fill(255, 0, 0);
    } else if (i % 100 == 0) {
      fill(0,255,0);
    } else {
      fill(0,0,255);
    }

    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    ellipse(i + 25, height/2, 50);
  }

  
  for (let i = 0; i < width; i += 50) {
    if (mouseIsPressed) {
      fill(0, 0, 0);
      stroke(255,0,0)
    } else if (i % 100 == 0) {
      fill(0,255,255);
    } else {
      fill(255,255,0);
    }
    rect(i, height/6, 75);
  }

  for (let i = 0; i < width; i += 50) {
    if (mouseIsPressed) {
      fill(150, 60, 60);
    } else if (i % 100 == 0) {
      fill(255,255,0);
    } else {
      fill(255);
    }
    rect(i + 25, height/4+200, 25);
  }

    }

        