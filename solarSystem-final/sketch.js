var speed;



function setup() {
    createCanvas(900, 700);
	//angleMode(DEGREE);
}

function draw() {
    background(0);
    speed = frameCount/2;

    push();
    translate(width/2, height/2);
	rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); // SUN
	

		rotate(radians(speed));
		translate(300,0);
        rotate(radians(speed));
			celestialObj(color(25,25,255),80);
            //moon 
			

			rotate(radians(-speed *2));
			translate(100,0);
			celestialObj(color(255),30);
            //earth 

    pop();
	
	
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
