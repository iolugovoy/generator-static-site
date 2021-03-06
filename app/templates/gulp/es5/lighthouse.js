'use strict';

var express = require('express');
var lighthouse = require('lighthouse');
var chromeLauncher = require('chrome-launcher');
var fs = require('fs');
var glob = require('glob');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {

	var chromeInst,
		mode = 'desktop';

	var port = 3007,
		reportFolder = config.directories.lighthouse || 'reports',
		opts = {
			disableDeviceEmulation: true,
			output:'html'
		};

	var pages = glob.sync(taskTarget+"/**/*.html").map(function(filePath) {
		return filePath.split('/').slice(1).join('/');
	});

	if (args && args.pages) {
		var passed = args.pages.split(',').map(function(file) {return file.trim()}),
			pages = pages.filter(function(page) {
			return passed.some(function(pass) {return pass === page});
		});
	}

	pages = pages.map(function(file) {return file.split('.html')[0]});

	var pagesMobile = pages.slice(0);

	gulp.task('lighthouse', function(done) {
		if (!pages.length) {
			done();
			return false;
		}

		var app = express();
		app.use(express.static(taskTarget));

		var server = app.listen(port, function() {

			chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(function(chrome) {
				chromeInst = chrome;
				getReport(pages, pagesMobile, onEnd);
			});

		});

		function onEnd() {
			server.close();
			chromeInst.kill()
			done();
		}

	});

	function getReport(pages, pagesMobile, complete) {
		if (!pages.length && !pagesMobile.length) {
			complete();
			return false;
		}

		var page = (pages.length) ? pages.pop() : pagesMobile.pop();

		runLighthouse('http://localhost:'+(port)+'/'+page + '.html', opts).then(function(results) {

			createFolders(page);
			saveReport('./'+reportFolder+'/'+page+'-'+mode+'.html', results.report);

			if (pages.length) {
				getReport(pages, pagesMobile, complete);
			} else if (!pages.length && pagesMobile.length) {
				mode = 'mobile';
				opts.disableDeviceEmulation = false;
				getReport(pages, pagesMobile, complete);
			} else if (!pages.length && !pagesMobile.length) {
				complete();
			}

		});
	}

	function saveReport(fullPath, html) {
		fs.writeFile(fullPath, html, function(err) {
			if(err) {
				return console.log(err);
			}
		});
	}

	function createFolders(fullPath) {
		if ( !fs.existsSync('./'+reportFolder+'/') ) fs.mkdirSync('./'+reportFolder+'/');

		var foldersLen = fullPath.split('/').length,
			folders = fullPath.split('/').slice(0, foldersLen - 1) || [];

		if (folders.length > 0) {
			for (var i = 0; i < folders.length; i++) {
				var path = folders.slice(0, i+1).join('/');

				if ( !fs.existsSync('./'+reportFolder+'/'+path+'/') ) fs.mkdirSync('./'+reportFolder+'/'+path+'/');
			}
		}
	}

	function runLighthouse(url, opts, config = null) {
		opts.port = chromeInst.port;

		return lighthouse(url, opts, config).then(function(results) {
			return results;
		});
	}

};
