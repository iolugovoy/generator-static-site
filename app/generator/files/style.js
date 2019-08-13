/**
 * Generate files specific to the styles folder
 */

'use strict';

var styleFiles = function styleFiles() {

  var $this = this,
      cssHelpers = ['media', 'scaffolding', 'typography', 'variables'];

  if (this.cssOption === 'less') {
    this.template('src/shared/_styles/main.less', 'src/_styles/main.less');

    cssHelpers.forEach(function(cssFile) {
      $this.template('src/shared/_styles/helpers/'+cssFile+'.less', 'src/_styles/helpers/'+cssFile+'.less');
    });

    this.template('src/shared/_styles/link/link.less', 'src/_modules/link/link.less');
  }
  if (this.cssOption === 'sass') {
    if (this.sassSyntax === 'sass') {
      this.template('src/shared/_styles/main.sass', 'src/_styles/main.sass');

      cssHelpers.forEach(function(cssFile) {
        $this.template('src/shared/_styles/helpers/'+cssFile+'.sass', 'src/_styles/helpers/'+cssFile+'.sass');
      });

      this.template('src/shared/_styles/link/link.sass', 'src/_modules/link/link.sass');
    }
    else {
      this.template('src/shared/_styles/main.scss', 'src/_styles/main.scss');

      cssHelpers.forEach(function(cssFile) {
        $this.template('src/shared/_styles/helpers/'+cssFile+'.scss', 'src/_styles/helpers/'+cssFile+'.scss');
      });

      this.template('src/shared/_styles/link/link.scss', 'src/_modules/link/link.scss');
    }
  }
  if (this.cssOption === 'stylus') {
    this.template('src/shared/_styles/main.styl', 'src/_styles/main.styl');

    cssHelpers.forEach(function(cssFile) {
      $this.template('src/shared/_styles/helpers/'+cssFile+'.styl', 'src/_styles/helpers/'+cssFile+'.styl');
    });

    this.template('src/shared/_styles/link/link.styl', 'src/_modules/link/link.styl');
  }
};

module.exports = styleFiles;
