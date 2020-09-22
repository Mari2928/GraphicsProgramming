// Step5: create global arrays
var confLocs = []; // to store confetti location
var confTheta = [];// to store the initial angle of confetti

function setup() {
    createCanvas(900, 800, WEBGL);
    
    // Step5: push 200 3D vectors into confLocs
    for(var i = 0; i < 200; i++){
        
        // set the required random value range and push them
        confLocs.push(  
            createVector(random(-500, 500), 
                         random(-800, 0), 
                         random(-500, 500)));
        confTheta.push(random(0, 360));     
    }  
}

function draw() {
    background(125);    
    angleMode(DEGREES);     
    normalMaterial();   // Step2: set the material
    confetti();
    
    // Step1: place the camera location
    //camera(800, -600, 800, 0,0,0,0,1,0); 
    
    // Step4: amend the camera() command
    var xLoc = cos(frameCount) * 1200;
    var yLoc = sin(frameCount) * -600;
    var zLoc = sin(frameCount) * 1200;
    camera(xLoc, -600, zLoc, 0,0,0,0,1,0); 
    

    for(var x = -400; x < 400; x+=50){      // Step1: set x-axis
        for(var z = -400; z < 400; z+=50){  // and z-axis             
            push(); 
            
            // Step3: calculate distance from the centre coordinate
            // modulate its value with sin(), distance and frameCount
            var distance = dist(x, z, 0, 0);            
            var length = map(sin(distance+frameCount),-1,1,100,300); 
            
            // Step2: set the stroke and stroke weight
            stroke(0);
            strokeWeight(2);
            
            translate(x,0,z);
            
            // Step1: create a grid of boxes 
            // Step3: using length variable
            box(50, length, 50);          
            pop();   
            
        }
    } 
}

// Step5: create a confetti() function
function confetti(){    
    for(var i = 0; i < 200; i++){ 
        
        // apply transformations within a push()/pop() pair
        push();    
        
        // translate to new location while rotating 
        translate(confLocs[i].x, confLocs[i].y,confLocs[i].z);
        rotateX(confTheta[i]);
        
        plane(15,15);       // draw a plane of size 15*15
        confLocs[i].y++;    // let the confetti fall downwards
        confTheta[i]+=10;   // let the confetti keep spinning
        
        // reset the height of confetti to the top
        // if reached the middle of the coordinate system
        if(confLocs[i].y > 0){
            confLocs[i].y = -800;
        }        
        pop();
    }
}
