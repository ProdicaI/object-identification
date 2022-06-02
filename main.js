let objects = [];
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

  if (status_ != false) {
    objectDetector.detect(image, (res, err) => {
      if (err) console.error(err);
      console.log(res);
      objects = res;
    });

    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Objects Detected.";
      document.getElementById(
        "numer"
      ).innerHTML = `Number of Objects: ${objects.length}`;

      fill("#FF0000");
      percent = Math.floor(objects[i].confidence * 100);
      text(
        `${objects[i].label} ${percent}%`,
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
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
