// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}
/////////////////////////////////////////////////////////////////
// Step1: implement sepiaFilter() to turn the image into sepia
function sepiaFilter(imgIn){
    imgOut = createImage(imgIn.width, imgIn.height);
    imgOut.loadPixels();
    imgIn.loadPixels();
    
    // Step1: convert each channel of all pixels
    for(var x = 0; x < imgOut.width; x++){
        for(var y = 0; y < imgOut.height; y++){
            
            // get the current color
            var index = (x + y * imgOut.width) * 4;
            var oldRed = imgIn.pixels[index + 0];
            var oldGreen = imgIn.pixels[index + 1];
            var oldBlue = imgIn.pixels[index + 2];   
            
            // make it to sepia 
            var newRed = (oldRed * .393)
                        +(oldGreen *.769)
                        +(oldBlue * .189);
            var newGreen = (oldRed * .349)
                        +(oldGreen *.686)
                        +(oldBlue * .168);
            var newBlue = (oldRed * .272)
                        +(oldGreen *.534)
                        +(oldBlue * .131);
            
            // constrain new values between 0 and 255
            newRed = constrain(newRed, 0, 255);
            newGreen = constrain(newGreen, 0, 255);
            newBlue = constrain(newBlue, 0, 255);
            
            // apply them to the current pixels           
            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
// Step2: implement darkCorners() to add dark corners
// adjusting the luminosity/brightness of the pixel 
// by scaling each colour channel
function darkCorners(resultImg){
    imgOut = createImage(resultImg.width, resultImg.height);
    imgOut.loadPixels();
    resultImg.loadPixels();
    for(var x = 0; x < imgOut.width; x++){
        for(var y = 0; y < imgOut.height; y++){
            var index = (x + y * imgOut.width) * 4;                       
            var oldRed = resultImg.pixels[index + 0];
            var oldGreen = resultImg.pixels[index + 1];
            var oldBlue = resultImg.pixels[index + 2];              
            var dynLum; // to hold the scaling     
            
            // calculate the distance of each pixel 
            var distance = dist(resultImg.width/2,
                                resultImg.height/2, 
                                x, y);
            
            // up to 300 pixels away from centre – no adjustment
            if(distance <= 300){
                dynLum = 1; 
            }
            
            // from 300 to 450 scale by 1 to 0.4 depending on distance
            else if(distance > 300 && distance <= 450){
                dynLum = map(distance, 300, 450, 1, 0.4);
            }
            
            // 450 and above scale by a value between 0.4 and 0
            else if (distance >= 450){
                var max = dist(imgIn.width/2, imgIn.height/2, 0, 0);
                distance = map(distance, 450, max, 0.4, 0);
                dynLum = constrain(distance, 0.4, 0);
            }
            
            var newRed = (oldRed * .393 * dynLum) 
                        + (oldGreen *.769 * dynLum) 
                        + (oldBlue * .189 * dynLum);
            var newGreen = (oldRed * .349 * dynLum) 
                        + (oldGreen *.686 * dynLum) 
                        + (oldBlue * .168 * dynLum);
            var newBlue = (oldRed * .272 * dynLum) 
                        + (oldGreen *.534 * dynLum) 
                        + (oldBlue * .131 * dynLum);

            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
// Step3: implement radialBlurFilter() to create a radial filter
// that blurs more as you move away from its centre
function radialBlurFilter(resultImg){    
    var imgOut = createImage(resultImg.width, resultImg.height);
    var matrixSize = matrix.length;

    imgOut.loadPixels();
    resultImg.loadPixels();
    
    // read every pixel
    for (var x = 0; x < imgOut.width; x++) {
        for (var y = 0; y < imgOut.height; y++) {

            var index = (x + y * imgOut.width) * 4;
            var r = resultImg.pixels[index + 0];
            var g = resultImg.pixels[index + 1];
            var b = resultImg.pixels[index + 2]; 
            
            // get the distance from the mouse, map it, 
            // and constrain it with the required values
            var distance = dist(x, y, mouseX, mouseY);
            distance = map(distance, 100, 300, 0, 1);
            var dynBlur = constrain(distance, 0, 1);
            
            var c = convolution(x, y, matrix, matrixSize, resultImg);
            
            // update the each channel of the specific pixel
            imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
            imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
            imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
/////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img) {    
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}
/////////////////////////////////////////////////////////////////
// Step4: implement borderFilter() to add a border around the image
function borderFilter(resultImg){
    // create a local buffer
    buffer = createGraphics(resultImg.width, resultImg.height);
    
    // draw the image onto the buffer
    buffer.image(resultImg, 0, 0);
    
    // draw a big, fat, white rectangle with rounded corners
    buffer.noFill();
    buffer.stroke(255);
    buffer.strokeWeight(20);
    buffer.rect(10, 10, resultImg.width-20, resultImg.height-20, 50);
    
    // draw another rectangle without rounded corners
    buffer.rect(10, 10, resultImg.width-20, resultImg.height-20);
    
    return buffer;
}