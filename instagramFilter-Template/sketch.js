// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
    [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage('assets/husky.jpg');
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgIn.width * 2, imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
    loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img) {
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = sepiaFilter(imgIn);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg)
    return resultImg;
}

function sepiaFilter(img) {
    imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();

    for (var i = 0; i < imgOut.width; ++i) {
        for (var j = 0; j < imgOut.height; ++j) {
            var index = (imgOut.width * j + i) * 4;

            oldRed = img.pixels[index + 0];
            oldGreen = img.pixels[index + 1];
            oldBlue = img.pixels[index + 2];

            newRed = oldRed * 0.393 + oldGreen * 0.769 + oldBlue * 0.189;
            newGreen = oldRed * 0.349 + oldGreen * 0.686 + oldBlue * 0.168;
            newBlue = oldRed * 0.272 + oldGreen * 0.534 + oldBlue * 0.131;

            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

function darkCorners(img) {
    imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();

    for (var i = 0; i < imgOut.width; ++i) {
        for (var j = 0; j < imgOut.height; ++j) {
            var index = (imgOut.width * j + i) * 4;

            var dx = img.width / 2 - i;
            var dy = img.height / 2 - j;
            var distance = (dy * 2 + dx * 2) * 0.5;

            distance = constrain(distance, 300, 450);
            var scale = map(distance, 300, 450, 1, 0.4);

            imgOut.pixels[index + 0] = scale * img.pixels[index + 0];
            imgOut.pixels[index + 1] = scale * img.pixels[index + 1];
            imgOut.pixels[index + 2] = scale * img.pixels[index + 2];
            imgOut.pixels[index + 3] = img.pixels[index + 3];
        }
    }
    imgOut.updatePixels();
    return imgOut;
}


function radialBlurFilter(img) {
  imgOut = createImage(img.width, img.height);
  var matrixSize=matrix.length;

  
  imgOut.loadPixels();
  img.loadPixels();

  for (var i = 0; i < imgOut.width; ++i) {
      for (var j = 0; j < imgOut.height; ++j) {
          var index = (imgOut.width * j + i) * 4;

          var c=convolution(i,j,matrix,matrixSize,img);

          r=img.pixels[index+0];
          g=img.pixels[index+1];
          b=img.pixels[index+2];
 
          var dynBlur=dist(mouseX,mouseY,i+img.width,j);
          dynBlur=constrain(dynBlur,100,300);
          dynBlur=map(dynBlur,100,300,0,1);

          imgOut.pixels[index + 0] = c[0]*dynBlur+r*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1]*dynBlur+g*(1-dynBlur);
          imgOut.pixels[index + 2] = c[2]*dynBlur+b*(1-dynBlur);
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function borderFilter(img) {

  buffer=createGraphics(img.width,img.height);
  buffer.background(img);
  buffer.noFill();
  buffer.strokeWeight(30);
  buffer.stroke(255);

  var c = 50; 

  buffer.rect(0,0,img.width,img.height,c,c,c,c);
  buffer.rect(0,0,img.width,img.height,0,0,0,0);

  return buffer;
}



function convolution(x,y,matrix,matrixSize,img){
  var totalRed=0.0;
  var totalGreen=0.0;
  var totalBlue=0.0;

  var offset=floor(matrixSize/2);

  for(var i=0;i<matrixSize;i++) {
    for(var j=0;j<matrixSize;j++) {
    var xloc=x + i - offset;
    var yloc=y + j - offset;
    var index= (xloc + img.width*yloc) *4;
    
    index=constrain(index,0,img.pixels.length-1);

    totalRed+=img.pixels[index+0]*matrix[i][j];
    totalGreen+=img.pixels[index+1]*matrix[i][j];
    totalBlue+=img.pixels[index+2]*matrix[i][j];
    }
  }
  return[totalRed,totalGreen,totalBlue]
};