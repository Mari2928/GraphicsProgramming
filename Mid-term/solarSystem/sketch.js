var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    
    /* setting for the sun */
    translate(width/2, height/2);        // locate at the center
    rotate(radians(speed/3));            // spin around its axis 
    celestialObj(color(255,150,0), 200); // draw the sun    
    
    /* setting for the earth */
    rotate(radians(speed));         // rotate right around the sun
    translate(300, 0);            // move to orbit 300 px       
    rotate(radians(speed));         // spin around its axis 
    celestialObj(color(0,191,255), 80);     // draw the earth  

    /* setting for the moon */    
    rotate(radians(-speed*4));  // rotate left around the earth
    translate(100, 0);
    
    // calculate the angle to show the same side to earthlings
    var moonSpinAngle = map(minute(), 0, 60, 0, 360);  
    rotate(radians(moonSpinAngle));
    celestialObj(color(255,255,240), 30);     // draw the moon    
    
    pop();

}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
