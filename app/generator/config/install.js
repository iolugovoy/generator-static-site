/**
 * Setup extra generator options
 */
'use strict';
var fs = require('fs');
var path = require('path');

var installConfig = function installConfig() {
  var self = this;

  if (this.clientPrompts.mergePackageJson === 'yes') {
	var currentJson = require(path.join(process.cwd(), './package.json')),
		newJson = require(path.join(process.cwd(), './new-package.json'));

	var currentDep = currentJson.dependencies,
		currentDev = currentJson.devDependencies,
		newDep = newJson.dependencies,
		newDev = newJson.devDependencies,
		mergedDep = Object.assign(currentDep, newDep),
		mergedDev = Object.assign(currentDev, newDev);

	currentJson.dependencies = mergedDep;
	currentJson.devDependencies = mergedDev;

	fs.writeFile(path.join(process.cwd(), './package.json'), JSON.stringify(currentJson, null, 4), 'utf8', function() {
		fs.unlink(path.join(process.cwd(), './new-package.json'), function() {});
	});
  }

  this.on('end', function() {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install'],
      callback: function() {
        self.log('\n' + 'Everything looks ready!'.blue +
          ' Get started by running "' + 'npm run dev'.green + '".\n'
        );
      }
    });
  });
};

module.exports = installConfig;
