/*stylelint no-process-exit:0 */

'use strict';

var path = require('path');
var gulpif = require('gulp-if');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;

  // ESLint
  gulp.task('stylelint', function() {
    gulp.src([
      path.join(dirs.source, '**/*.scss')
    ])
    .pipe(plugins.stylelint({
        fix: true,
        reporters: [
            {
                formatter: 'string',
                console: true
            }
        ]
    }))
    .on('error', function() {
      if (!browserSync.active) {
        process.exit(1);
      }
    })
    .pipe(gulp.dest(dirs.source));
  });
};
