// Constructor
var Link = function() {
	this.name = 'Link';
};

Link.prototype.hello = function() {
	console.log('%s module', this.name);
};

module.exports = Link;
