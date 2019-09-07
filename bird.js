function Bird(){
	this.r = 15
	this.x = 40;
	this.y = height/2;
	this.vy = 0;

	this.g = -0.5;
	this.jumpVel = 8; //Not going to use Force, although it'd be more realistic

	this.draw = function(){
		strokeWeight(0.5);
		fill(250, 255, 0);
		ellipse(this.x, this.y, 2*this.r, 2*this.r);
	}
	this.update = function(){
		this.vy -= this.g;
		this.y += this.vy;

		this.minHeight = height - grassImg.height*new Grass().scl - this.r;
		if(this.y >= this.minHeight){
			/*this.y = this.minHeight;
			this.vy = 0;*/
			gameOver();
		}
		else if (this.y - this.r <= 0){
			gameOver();
		}
	}
	this.jump = function(){
		this.vy = -this.jumpVel;
	}
}