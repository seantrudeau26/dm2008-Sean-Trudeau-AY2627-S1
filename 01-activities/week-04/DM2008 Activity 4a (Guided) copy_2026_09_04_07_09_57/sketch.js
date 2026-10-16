// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("chocolate", 150, width / 2, height / 2);
  othercookie = new Cookie("Vanilla", 100, 300, 300);
}

function draw() {
  background(230);
  cookie.show();
  othercookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "vanilla":
        fill(255, 223, 150);
        break;
      case "snickerdoodle":
        fill(237, 220, 191);
        break;
         case "dark-chocolate":
        fill("#2f2722");
        break;
      default:
        fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
  }

  move() {
    switch (key) {
      case "d":
        this.x = this.x + 10;
        break;
      case "a":
        this.x = this.x - 10;
        break;
      case "w":
        this.y = this.y - 10;
        break;
      case "s":
        this.y = this.y + 10;
        break;
    }
  }

  randomFlavor() {
    let flav = ["chocolate", "vanilla", "snickerdoodle","dark-chocolate"];
    this.flavor = flav[round(random(0, 4))];
  }
}

function keyPressed() {
  cookie.move();
  othercookie.move();
}

function mousePressed() {
  cookie.randomFlavor();
  othercookie.randomFlavor();
}
