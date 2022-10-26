////////////////////////////////////////////////////////////////
function setupGround() {
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true,
        angle: 0,
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
    push();
    fill(128);
    drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
    propeller = Bodies.rectangle(150, 480, 200, 15, {
        isStatic: true,
        angle: angle,
    });
    World.add(engine.world, propeller);

    // your code here
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
    push();
    // your code here
    fill(255);
    drawVertices(propeller.vertices);
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle = angle + angleSpeed;
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
    var bird = Bodies.circle(mouseX, mouseY, 20, {
        friction: 0,
        restitution: 0.95,
    });
    Matter.Body.setMass(bird, bird.mass * 10);
    World.add(engine.world, [bird]);
    birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
    push();
    for (var i = 0; i < birds.length; ++i) {
        drawVertices(birds[i].vertices);
        if (isOffScreen(birds[i])) {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
            i -= 1;
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
    world = engine.world;
    var size = 50;
    stack = Composites.stack(500, 100, 3, 30, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 80, 80);
    });
    Composite.add(world, [stack]);
    //you code here
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
    push();
    //your code here
    fill(255, 255, 0);
    for (var i = 0; i < stack.bodies.length; i++) {
        drawVertices(stack.bodies[i].vertices);
    }
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
    //your code here
    slingshotBird = Bodies.circle(150, 200, 20, {
        friction: 0.95,
        restitution: 0.95,
    });

    Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

    slingshotConstraint = Constraint.create({
        bodyB: slingshotBird,
        pointA: { x: 150, y: 200 },
        stiffness: 0.01,
        length: 10,
        damping: 0.0001,
    });

    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
    push();
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
    // your code here
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05 },
    };
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}
