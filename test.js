var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts([
	'bower_components/pixi.js/bin/pixi.js'
],
function() {
	var View = require('pixijs-managed-view');
	var RenderManager = require('pixijs-render-manager');
	var InteractionManager = require('./');
	var TestCircle = require('./TestCircle');
	var view = new View();
	var interactionManager = new InteractionManager(view.stage);
	
	var smallerSize = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
	var radius = smallerSize * .2;
	for (var i = 0; i < 10; i++) {
		var circle = new TestCircle(
			radius,
			(window.innerWidth - radius * 2) * Math.random() + radius, 
			(window.innerHeight - radius * 2) * Math.random() + radius
		);
		view.stage.addChild(circle);
		interactionManager.addDragable(circle);
	}
	view.renderer.render(view.stage);

	RenderManager.add(view.renderer, view.stage);
	// RenderManager.onEnterFrame.add(function() {
	// 	circle.x = Math.random() * window.innerWidth;
	// 	circle.y = Math.random() * window.innerHeight;
	// });
	RenderManager.start();
})