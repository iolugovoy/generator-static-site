// Main javascript entry point
// Should handle bootstrapping/starting application

// var $ = require('jquery');
var Link = require('../_modules/link/link');

(function() {
	var link = new Link(); // Activate Link modules logic
	link.hello();
	console.log('Welcome to Yeogurt!');
}());
