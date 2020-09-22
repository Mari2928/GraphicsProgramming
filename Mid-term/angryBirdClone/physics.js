////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150,480, 200, 15, {isStatic: true, angle: angle});
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  fill(255);
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;  
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for(var i =0; i<birds.length; i++){
      drawVertices(birds[i].vertices);
      if(isOffScreen(birds[i])){
          removeFromWorld(birds[i]);
          birds.splice(i, 1);
          i--;
      }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
// starting from location(700, 140), it stacks 6 of 80*80 size of boxes on top of each other repeating for 3 columns
function setupTower(){
  var x = 700;
  var y = 140;
  var r;
  for(var i = 0; i < 3; i++){      
      for(var j = 0; j < 6; j++){
          var b = Bodies.rectangle(x,y,80,80,{restitution:.8, friction:.5});
          boxes.push(b);
          World.add(engine.world, [b]);
          r = random(100, 255);
          let c = color(0, r, 0);
          colors.push(c);
          y+=80;
      }
      x+=80;
      y = 140;
  } 
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  for(var i = 0; i<boxes.length; i++){      
      fill(colors[i]);
      drawVertices(boxes[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(200, 200, 20, {restitution: 0.95, friction:0});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  slingshotConstraint = Constraint.create({
      pointA: {x:200, y:200},
      bodyB: slingshotBird,
      pointB: {x:-10, y:-10},
      stiffness: 0.01,
      damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill(255, 204, 0);
  drawVertices(slingshotBird.vertices);
  fill(255);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
