var gulp        = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), // Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true})) //livereload для файлов.css
});
/*
gulp.task('scripts', function(){					//создание одного файла js
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'		//,'.....'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});
*/
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false //отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync', 'sass'/*, 'scripts'*/], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);  //livereload для всех файлов.html находящихся в папках и подпапках
	gulp.watch('app/js/**/*.js', browserSync.reload); //livereload для всех файлов.js находящихся в папках и подпапках
});
