function Pipe(){
	this.x = width;
	this.width = 60;
	this.emptySpace = 90;
	this.middle = Math.round(random(this.emptySpace, height - this.emptySpace - grassImg.height*new Grass().scl));

	this.draw = function(){
		fill(0, 255, 0);
		rect(this.x, this.middle - this.emptySpace, this.width, -(this.middle - this.emptySpace));
		rect(this.x, this.middle + this.emptySpace, this.width, height - this.middle - this.emptySpace - grassImg.height*new Grass().scl);
	}
	this.update = function(){
		this.x -= 1;
	}
	this.offScreen = function(){
		this.x <= -this.width;
	}
}