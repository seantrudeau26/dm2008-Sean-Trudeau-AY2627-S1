// DM2008 — Activity 3a [Guided]
// Array Sampler (25 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let palette = ["#b5b7e8", "#8c1d38", "#3c78d8", "#ffeb3b", "#f76402", "#09fb39"];
let size = [10, 60, 120, 170, 230, 500];
let crawl = [50, 100, 150, 200, 250, 300];
let run = [25, 75, 125, 175, 225, 275];
let currentIndex = 2;

function setup() {
  createCanvas(400, 400);
  let picked = random(palette);
  noStroke();
}

function draw() {
  background(220);

  // Draw the ellipse using the current color in the array
  fill(palette[currentIndex]);
  ellipse(crawl[currentIndex], run[currentIndex], size[currentIndex]);

  // Wrap back to the start when we reach the end
  if (currentIndex >= palette.length) {
    currentIndex = 0;
  }

  console.log("Current index:", currentIndex, "→", palette[currentIndex]);
}

// Advance to the next color each time a key is pressed
function keyPressed() {
  currentIndex++; // shorthand for currentIndex += 1

}

function mousePressed() {
  currentIndex = round(random(palette.length - 1));
}
