// Hand Pose Painting with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;

function preload() {
  // Initialize HandPose model without flipped video input
  handPose = ml5.handPose({ flipped: false });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);

  // Create an off-screen graphics buffer for painting
  painting = createGraphics(640, 480);
  painting.clear();

  // Capture video without flipping
  video = createCapture(VIDEO, { flipped: false });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;

    // Use index finger coordinates for drawing
    let x = index.x;
    let y = index.y;

    // Draw a line from the previous position to the current position
    painting.stroke(255, 255, 0);
    painting.strokeWeight(8);
    painting.line(px, py, x, y);

    // Update previous position
    px = x;
    py = y;
  }

  // Overlay painting on top of the video
  image(painting, 0, 0);
}
