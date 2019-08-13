/**
 * Generate files specific to the root directory
 */

'use strict';

var rootFiles = function rootFiles() {
  var $this = this;
  // Create needed Directories

  // root (/)
  if (this.jsPreprocessor === 'none') {
    this.template('gulpfile.js', 'gulpfile.js');
  }
  else {
    this.template('gulpfile.babel.js', 'gulpfile.babel.js');
    this.template('.babelrc', '.babelrc');
  }

  if (this.clientPrompts.mergePackageJson !== 'yes') {
  	this.template('_package.json', 'package.json');
  } else {
	this.template('_package.json', 'new-package.json');
  }

  this.template('README.md', 'README.md');

  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');

  this.copy('src/shared/robots.txt', 'src/robots.txt');

  [
    'apple-icon-60x60.png',
    'android-icon-36x36.png',
    'android-icon-48x48.png',
    'android-icon-72x72.png',
    'android-icon-96x96.png',
    'android-icon-144x144.png',
    'android-icon-192x192.png',
    'apple-icon-57x57.png',
    'apple-icon-72x72.png',
    'apple-icon-76x76.png',
    'apple-icon-114x114.png',
    'apple-icon-120x120.png',
    'apple-icon-144x144.png',
    'apple-icon-152x152.png',
    'apple-icon-180x180.png',
    'apple-icon-precomposed.png',
    'apple-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-96x96.png',
    'favicon.ico',
    'ms-icon-70x70.png',
    'ms-icon-144x144.png',
    'ms-icon-150x150.png',
    'ms-icon-310x310.png'
  ].forEach(function(faviconFile) {
    $this.copy('src/shared/_favicons/' + faviconFile, 'src/favicons/' + faviconFile);
  });

  this.copy('editorconfig', '.editorconfig');
  this.template('eslintrc', '.eslintrc');
  this.template('stylelintrc', '.stylelintrc');
  this.template('prettierrc', '.prettierrc');

};

module.exports = rootFiles;
