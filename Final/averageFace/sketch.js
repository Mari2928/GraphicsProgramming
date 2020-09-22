var imgs = [];
var avgImg;
var numOfImages = 30;
var filename = "";
//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    
    // Step1: load faces in memory from assets folder
    for(var i = 0; i < numOfImages; i++){
        filename = 'assets/' + i + '.jpg';
        imgs[i] = loadImage(filename);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    
    // Step2: make the canvas width twice the first image
    createCanvas(imgs[0].width*2, imgs[0].height);
    
    pixelDensity(1);
    
    // Step3: initialise the avgImg variable
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    
    // Step2: draw the first image on the left of the canvas
    image(imgs[0], 0, 0);
    imgs[0].loadPixels();
    
    // Step4: access the pixel data in imgs array and of avgImg
    for(var i = 0; i < numOfImages; i++){
        imgs[i].loadPixels();                               
    }       
    avgImg.loadPixels(); 
    
    // Step5: create a nested for-loop looping over
    // all pixels on the first image in the array
    for(var x = 0; x < imgs[0].width; x++){
        for(var y = 0; y < imgs[0].height; y++){
            
            // Step5: convert x and y to a pixel index value
            var index = (imgs[0].width * y + x) * 4;
            
            // Step5: use the index value to set the  
            // corresponding pixel in the avgImg to red
            var redC = imgs[0].pixels[index + 0];
            var alpha = imgs[0].pixels[index + 3];            
            avgImg.pixels[index + 0] = redC;
            avgImg.pixels[index + 3] = alpha;
            
            // Step6: create three variables with 0
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            
            // Step6: looping through imgs array 
            // summing up each channel value
            for(var i = 0; i < numOfImages; i++){
                sumR += imgs[i].pixels[index + 0];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];       
            }
            
            // Step6: update each channel in the avgImg
            avgImg.pixels[index + 0] = sumR/numOfImages;
            avgImg.pixels[index + 1] = sumG/numOfImages;
            avgImg.pixels[index + 2] = sumB/numOfImages;
            avgImg.updatePixels();
        }         
    }
    
    // Step5: update avgImg pixels and 
    // draw it to the right of the canvas
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);   
    avgImg.loadPixels();       
    noLoop();   // no need for looping       
}
