var gulp        = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), // Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'),// Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'),// Подключаем gulp-cssnano (для сжатия css)
    rename      = require('gulp-rename'); // Подключаем gulp-rename (для переименования файлов)

gulp.task('sass', function(){               // из scss или sass в css
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true})) //livereload для файлов.css
});

gulp.task('scripts', function(){					//создание одного файла js
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.min.js'		//,'.....'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'],function(){       //минификация и переименование libs.css
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){          //сервер
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false //отключаем уведомления
	});
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);  //livereload для всех файлов.html находящихся в папках и подпапках
	gulp.watch('app/js/**/*.js', browserSync.reload); //livereload для всех файлов.js находящихся в папках и подпапках
});
