function Cloud(){
	this.x = random(width, width+20);
	this.y = random(0, 20);
	this.scl = 1/(random (2.5, 3.5));

	this.draw = function(){
		image(cloudImg, this.x, this.y, cloudImg.width*this.scl, cloudImg.height*this.scl);
	}
	this.update = function(){
		this.x -= 0.5;
	}
	this.offScreen = function(){
		return (this.x <= -cloudImg.width*this.scl);
	}
}
function Grass(){
	this.scl = 1/3;
	this.x = width;
	this.y = (height - (grassImg.height*this.scl));

	this.draw = function(){
		image(grassImg, this.x, this.y, grassImg.width*this.scl, grassImg.height*this.scl);
	}
	this.update = function(){
		this.x -= 1;
	}
	this.offScreen = function(){
		return (this.x <= -grassImg.width*this.scl);
	}
}