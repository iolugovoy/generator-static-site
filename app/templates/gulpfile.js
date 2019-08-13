'use strict';
<% if (testFramework === 'mocha' || testFramework === 'jasmine') { %>
var path = require('path');<% } %>
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSyncLib = require('browser-sync');
var pjson = require('./package.json');
var minimist = require('minimist');
var glob = require('glob');

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
var plugins = gulpLoadPlugins();<% if (testFramework !== 'none') { %>
// Create karma server
var KarmaServer = require('karma').Server;<% } %>

var config = pjson.config;
config.defaultNotification = function(err) {
	return {
		subtitle: err.plugin,
		message: err.message,
		sound: 'Funk',
		onLast: true
	};
};

config.successNotification = function() {
	return {
		subtitle: 'Done',
		onLast: true,
		sound: 'Funk'
	};
};

var args = minimist(process.argv.slice(2));
var dirs = config.directories;
var taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
var browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/**/*.js').filter(function(file) {
	return (/\.(js)$/i).test(file);
}).map(function(file) {
	require(file)(gulp, plugins, args, config, taskTarget, browserSync);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
	'copy',
	'imagemin'<% if (htmlOption === 'jade') { %>,
	'jade'<% } else if (htmlOption === 'nunjucks') {  %>,
	'nunjucks'<% } %><% if (cssOption === 'less') { %>,
	'less'<% } else if (cssOption === 'sass') { %>,
	'sass'<% } else if (cssOption === 'stylus') { %>,
	'stylus'<% } %>,
	'browserify',
	'concatLegacyScripts'
]);

// Server tasks with watch
gulp.task('serve', [
	'imagemin',
	'copy'<% if (htmlOption === 'jade') { %>,
	'jade'<% } else if (htmlOption === 'nunjucks') {  %>,
	'nunjucks'<% } %><% if (cssOption === 'less') { %>,
	'less'<% } %><% if (cssOption === 'sass') { %>,
	'sass'<% } %><% if (cssOption === 'stylus') { %>,
	'stylus'<% } %>,
	'browserify',<% if (concatOldScripts === 'yes') { %>
	'concatLegacyScripts',<% } %>
	'browserSync',
	'watch'
]);

// Linting
gulp.task('lint', ['eslint', 'stylelint']);

// Testing
gulp.task('test', ['eslint']<% if (testFramework === 'none') { %>);<% } else { %>, function(done) {
	new KarmaServer({
		configFile: path.join(__dirname, '/karma.conf.js'),
		singleRun: !args.watch,
		autoWatch: args.watch
	}, done).start();
});<% } %>
