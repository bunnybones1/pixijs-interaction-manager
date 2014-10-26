var onlyOnePerPoint = true;
function InteractionManager(stage) {
	var Pointers = require('input-unified-pointers');
	var interactionManager = new PIXI.InteractionManager(stage);
	this.draggableObjects = [];
	this.dragging = [];
	this.draggingByPoint = [];
	for (var i = 0; i < 21; i++) {
		this.draggingByPoint[i] = [];
	};
	console.log(Pointers);
	this.onDown = this.onDown.bind(this);
	this.onUp = this.onUp.bind(this);
	this.onDrag = this.onDrag.bind(this);
	Pointers.onPointerDownSignal.add(this.onDown);
	Pointers.onPointerUpSignal.add(this.onUp);
	Pointers.onPointerDragSignal.add(this.onDrag);
}

InteractionManager.prototype = {
	addDragable: function(object) {
		object.interactive = true;
		this.draggableObjects.push(object);
	},
	onDown: function(x, y, id) {
		for (var i = 0; i < this.draggableObjects.length; i++) {
			var object = this.draggableObjects[i];
			if(this.dragging.indexOf(object) !== -1) continue;
			if(object.hitTest(x, y)) {
				object.draggingByPointOffset = {
					x: x - object.x,
					y: y - object.y
				}
				this.draggingByPoint[id].push(object);
				this.dragging.push(object);
			}
		};
	},
	onDrag: function(x, y, id) {
		var dragging = this.draggingByPoint[id];
		for (var i = dragging.length - 1; i >= 0; i--) {
			var object = dragging[i];
			object.x = x - object.draggingByPointOffset.x;
			object.y = y - object.draggingByPointOffset.y;
			if(onlyOnePerPoint) return;
		};
	}, 
	onUp: function(x, y, id) {
		var dragging = this.draggingByPoint[id];
		for (var i = dragging.length - 1; i >= 0; i--) {
			var object = dragging[i];
			dragging.splice(i, 1);
			var index = this.dragging.indexOf(object);
			if(index !== -1) this.dragging.splice(index, 1);
		};
	}
}
module.exports = InteractionManager;