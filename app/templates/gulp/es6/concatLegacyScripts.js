'use strict';

import path from 'path';
import gulpif from 'gulp-if';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
	let dirs = config.directories;
	let dest = path.resolve(taskTarget, dirs.scripts.replace(/^_/, ''));

	// concat legacy scripts
	gulp.task('concatLegacyScripts', () => {
		gulp.src(path.join(dirs.source, dirs.legacyScripts, config.entries.legacyScripts))
			.pipe(plugins.include())
				.on('error', console.log)
			.pipe(gulpif(args.production, plugins.uglify()))
				.on('error', plugins.notifier.error)
			.pipe(plugins.notifier.success())
			.pipe(gulp.dest(dest));
	});
}
