var camera;
var distance;
var length;
var confLocs = [];
var confTheta = [];

function setup() {
    createCanvas(900, 800, WEBGL);
    camera = createCamera();
    camera.setPosition(800, -600, 800);
    camera.lookAt(0, 0, 0);

    for (var i = 0; i < 200; ++i) {
        confLocs.push(
            createVector(random(-500, 500), random(-800, 0), random(-500, 500))
        );
        confTheta.push(random(0, 360));
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    //perspective(60, 4 / 4, mouseX, mouseY);
    drawBoxes();
    confetti();
    flyInCircle();
    // rotateX(-400, 400);
    // //rotateY(-400, 400);
    // rotateZ(-400, 400);
}

function drawBoxes() {
    normalMaterial();
    stroke(0);
    strokeWeight(2);

    for (var i = 0; i < 15; ++i) {
        for (var j = 0; j < 15; ++j) {
            // calcluate the distance, and prepare the length for boxes
            distance = dist(50 * i - 400, 0, 50 * j - 400, 0, 0, 0);
            length = map(sin(distance + frameCount), -1, 1, 100, 300);

            //draw raw boxes at the position
            push();
            translate(50 * i - 400, 0, j * 50 - 400);
            box(50, length, 50);
            console.log(box);
            pop();
        }
    }
}

function flyInCircle() {
    camera.setPosition(
        sin(frameCount / 10) * 800,
        -600,
        cos(frameCount / 10) * 800
    );
    camera.lookAt(0, 0, 0);
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        push();
        translate(confLocs[i]);
        rotateY(confTheta[i]);
        plane(15, 15);
        pop();

        confLocs[i].y += 1;
        confTheta[i] + 10;

        if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }
    }
}
