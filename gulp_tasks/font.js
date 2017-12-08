const gulp = require('gulp');
const fontgen = require('gulp-fontgen');

gulp.task('fontgen', function() {
	return gulp.src("./src/*.{ttf,otf}")
	.pipe(fontgen({
		dest: "./dest/"
	}));
});