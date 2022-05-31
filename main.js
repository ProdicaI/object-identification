let video = "";
let status_;

async function preload() {
  video = createVideo("./video.mp4");
  video.hide();
}

async function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
}

async function draw() {
  image(video, 0, 0, 480, 380);
}

async function start() {
  objectDetector = ml5.objectDetector("cocossd", () => {
    console.log("Model Loaded.");
    status_ = true;
    video.loop();
    video.speed(1);
    video.volume(0);
  });

  document.getElementById("status").innerHTML = "Status: Detecting Objects...";
}
