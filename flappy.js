var bird, cloudImg, grassImg;
var clouds = [];
var grass = [];
var pipes = [];
var lost = false;
var points = 0;
function preload(){
	cloudImg = loadImage("Images/cloud.png");
	grassImg = loadImage("Images/grass.png");
}
function setup(){
	createCanvas(400, 600);
	bird = new Bird();
	generateInitialCloud();
	generateInitialGrass();
	pipes.push(new Pipe());
}

function draw(){
	background(204, 238, 255);
	handleClouds();
	handleBird();
	handleGrass();
	handlePipes();
	if(lost !== true){
		drawPoints();
	}
	else{
		fill(255, 255, 179);
		rect(width/2 - 100, height/2 - 50, 220, 100, 10);
		fill(0,0,0);
		textSize(40);
		text(points, width/2 , height/2);
		fill(0,0,0);
		textSize(20);
		text("You lost!", width/2 - 25, height/2+20);
		text("Press space to restart", width/2 - 85, height/2 + 40)
		noLoop();
	}
}

function keyPressed(){
	if(lost !== true){
		if(key == ' '){
			bird.jump();
		}
	}
	else {
		if(key == ' '){
			lost = false;
			setTimeout(reset, 500);
		}
	}
}
function touchStarted(){
  if(lost!== true){
    bird.jump();
  }
  else{
  	lost = false;
  	setTimeout(reset, 500);
  }
}
function generateInitialCloud(){
	var tempCloud = new Cloud();
	tempCloud.x = random(width/1.5, width-cloudImg.width*new Cloud().scl);
	clouds.push(tempCloud);
}
function handleClouds(){
	if(frameCount % 400 == 0){
		clouds.push(new Cloud());
	}
	for(var i=0; i<clouds.length; i++){
		clouds[i].draw();
		clouds[i].update();
		if(clouds[i].offScreen()){
			clouds.splice(i, 1);
		}
	}
}
function handleBird(){
	bird.draw();
	bird.update();
}
function generateInitialGrass(){
	for(a=0; a<width; a++){
		var tempGrass = new Grass();
		if((grassImg.width*tempGrass.scl)*a <= width){
			tempGrass.x = (grassImg.width*tempGrass.scl)*a;
			grass.push(tempGrass);
		}
	}
}
function handleGrass(){
	for(var j=0; j<grass.length; j++){
		grass[j].draw();
		grass[j].update();
		if(grass[j].offScreen()){
			grass.splice(j, 1);
		}
	}
	if(grass.length <= Math.ceil(width/(grassImg.width*new Grass().scl))){
		var tempGrass = new Grass();
		tempGrass.x = grass[grass.length - 1].x + grassImg.width*new Grass().scl;
		grass.push(tempGrass);
	}
}
function handlePipes(){
	if(frameCount % 200 == 0){
		pipes.push(new Pipe());
	}
	for(k=0; k<pipes.length; k++){
		pipes[k].draw();
		pipes[k].update();
		if(pipes[k].offScreen()){
			pipes.splice(k, 1);
		}
		touching(bird, pipes[k]);
	}
}
function touching(bird, pipe){
	if (bird.x + bird.r >= pipe.x && bird.x - bird.r <= pipe.x + pipe.width){
		if (bird.y - bird.r <= pipe.middle - pipe.emptySpace || bird.y + bird.r >= pipe.middle + pipe.emptySpace){
			gameOver();
		}
		else if(bird.x - bird.r == pipe.x + pipe.width){
			points++;
		}
	}
}
function gameOver(){
	lost = true;	
}
function reset(){
	lost = false;
	frameCount = 0;
	points = 0;
	bird = new Bird();
	clouds = [];
	generateInitialCloud();
	grass = [];
	generateInitialGrass();
	pipes = [];
	pipes.push(new Pipe());
	loop();
}
function drawPoints(){
	fill(255, 255, 179);
	rect(width/2-40, 10, 80, 40, 10);
	textSize(30);
	fill(0,0,0);	
	text(points, width/2-8, 40);
}