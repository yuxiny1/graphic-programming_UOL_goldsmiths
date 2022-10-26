var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() {
    // preload() runs once
    for (var i = 0; i < numOfImages - 1; i++) {
        imgs.push(loadImage('assets/' + i + '.jpg'));
        console.log(imgs[i]);
    }
}

//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
    background(255);
    image(imgs[5], 0, 0);

    for (var i = 0; i < numOfImages - 1; ++i) {
        imgs[i].loadPixels();
    }

    avgImg.loadPixels();

    for (let i = 0; i < avgImg.width; ++i) {
        for (let j = 0; j < avgImg.height; ++j) {
            index = (avgImg.width * j + i) * 4;
            sumR = 0.0;
            sumG = 0.0;
            sumB = 0.0;
            for (let k = 0; k < numOfImages - 1; k++) {
                sumR += imgs[k].pixels[index];
                sumG += imgs[k].pixels[index + 1];
                sumB += imgs[k].pixels[index + 2];
            }
            avgImg.pixels[index] = sumR / numOfImages - 1;
            avgImg.pixels[index + 1] = sumG / numOfImages - 1;
            avgImg.pixels[index + 2] = sumB / numOfImages - 1;
            avgImg.pixels[index + 3] = 255;
        }
    }

    console.log(sumB, sumG, sumR, numOfImages - 1);
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0, imgs[0].width, imgs[0].height);
    noLoop();
}
