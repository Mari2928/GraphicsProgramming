particles = [];
let _location;  // to pass location info to jet thruster class
let _size;

class Spaceship {  

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50; 
    _location = this.location;
    _size = this.size;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
    
    // draw jet thruster
    for (let i = 0; i < 5; i++) {
        let p = new Particle();
        particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
    fill(0,191,255);
    rect(this.location.x - this.size/2, this.location.y + this.size/2, 50, 15);
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var gravity = new createVector(0, 0.05);
    this.applyForce(gravity);
      
    this.friction = this.velocity.copy();    
    this.friction.mult(-1);
    this.friction.normalize();  
    this.friction.mult(0.3);
    this.applyForce(this.friction);
  }  
}
// Further development 1: Add jet thruster class
class Particle {
      
      constructor() {          
        this.x = random(_location.x - _size/2, (_location.x - _size/2)+45);
        this.y = _location.y+40;
        this.vx = random(-1, 1);
        this.vy = random(1, 1);
        this.alpha = 255;
        this.d = 12;
      }

      finished() {
        return this.alpha < 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 3;
        this.d -= random(0.05, 0.1);
      }

      show() {
        noStroke();
        fill(random(200,230), random(50, 150), 10, this.alpha);
        ellipse(this.x, this.y, this.d);
      }
  }
