// Main javascript entry point
// Should handle bootstrapping/starting application

// import $ from 'jquery';
import Link from '../_modules/link/link';

(function() {
	const link = new Link(); // Activate Link modules logic
	link.hello();
	console.log('Welcome to Yeogurt!');
}());
