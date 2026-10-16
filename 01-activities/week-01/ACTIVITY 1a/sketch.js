// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
  noStroke()
  
fill(0,0,0)
 
  ellipse(175, 200, 50, 100)
  ellipse(225, 200, 50, 100)
  
  fill(225,225,225)
  ellipse(200,200,75,150)
  ellipse(200,125,45,60)
  
  stroke(0)
  line(195, 275, 175, 275)
  line(205, 275, 225, 275)
  
  // YOUR CODE HERE
  
  // YOUR CODE HERE
  
  helperGrid(); // do not edit or remove this line
}
