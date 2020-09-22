var stepSize = 20;

function setup() {
  createCanvas(500, 500);

}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  
  colorGrid();
    
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){ 
    for(var x = 0; x < width; x+= stepSize){
        for(var y= 0; y < height; y += stepSize){
            var s = map(mouseX, 0, width, 1, 200);
            var n = noise(x/s, y/s, frameCount/s);
            var c = lerpColor(color(255,66,100),
                              color(66,255,107), n);
            fill(c);
            noStroke();
            rect(x, y, stepSize, stepSize);
        }
    }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){ 
  for (let x1 = stepSize/2; x1 < width; x1 += stepSize) {
    for (let y1 = stepSize/2; y1 < height; y1 += stepSize) {
      var s = map(mouseX, 0, width, 1, 200);
      var nX = noise(x1/s, y1/s, frameCount/s);
      var angle = map(nX, 0, 1, 0, 720);
      
      push(); 
      stroke(0);
      strokeWeight(2);
      translate(x1, y1);
      rotate(radians(angle));
        
      line(0, 0, 12, -16);
      pop();      
    }
  } 
}
