function TestCircle(size, x, y, color) {
	PIXI.Graphics.call(this);
	
	// draw a shape
	this.size = size;
	this.color = color || 0xff0000;

	this.redraw();

	this.x = x;
	this.y = y;
	this.hitArea = new PIXI.Circle(0, 0, size*.5);
}

TestCircle.prototype = Object.create(PIXI.Graphics.prototype);
TestCircle.prototype.constructor = TestCircle;

TestCircle.prototype.redraw = function() {
	this.clear();
		// set a fill and line style
	this.beginFill(0xffffff - this.color, .25);
	this.lineStyle(1, this.color, 1);

	var radius = this.size * .5;
	this.drawCircle(0, 0, radius);
	this.endFill();
}
TestCircle.prototype.hitTest = function(x, y) {
	return this.hitArea.contains(this.x - x, this.y - y);
};

TestCircle.prototype.clone = function() {
	var clone = new this.constructor(this.size, this.x, this.y);
	if(this.parent) this.parent.addChildAt(clone, 0);
	return clone;
}

module.exports = TestCircle;