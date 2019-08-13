/**
 * Generate files specific to the styles folder
 */

'use strict';

var styleFiles = function styleFiles() {
  if (this.jsPreprocessor === 'none') {
    this.template('src/shared/_scripts/main.js', 'src/_scripts/main.js');
    this.template('src/shared/_modules/link/link.js', 'src/_modules/link/link.js');
  }
  else {
    this.template('src/shared/_scripts/main.es6.js', 'src/_scripts/main.js');
    this.template('src/shared/_modules/link/link.es6.js', 'src/_modules/link/link.js');
  }
  if (this.concatOldScripts === 'yes') {
  	this.template('src/shared/_legacyScripts/legacy.js', 'src/_legacyScripts/legacy.js');
  	this.template('src/shared/_legacyScripts/scripts/oldScript.js', 'src/_legacyScripts/scripts/oldScript.js');
  }
};

module.exports = styleFiles;
