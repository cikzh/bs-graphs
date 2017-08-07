var gulp = require('gulp');
var sass = require('gulp-sass');
var serve = require('gulp-serve');
var inject = require('gulp-inject');
var ts = require('gulp-typescript');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');

const reload = browserSync.reload;

var dest = 'dist/';

gulp.task('styles', function(){
    var injectAppFiles = gulp.src('src/styles/*.scss', {read: false});
    var injectGlobalFiles = gulp.src('src/global/*.scss', {read: false});
    
    function transformFilepath(filepath) {
	return '@import "' + filepath + '";';
    }
    
    var injectAppOptions = {
	transform: transformFilepath,
	starttag: '// inject:app',
	endtag: '// endinject',
	addRootSlash: false
    };

    var injectGlobalOptions = {
	transform: transformFilepath,
	starttag: '// inject:global',
	endtag: '// endinject',
	addRootSlash: false
    };
    
    return gulp.src('src/main.scss')
	.pipe(wiredep())
	.pipe(inject(injectAppFiles, injectAppOptions))
	.pipe(sass())
	.on('error', swallowError)
	.pipe(gulp.dest('dist'));
});

gulp.task('html', ['styles'], function() {
    var injectStyles = gulp.src(['dist/main.css']);

    var injectOptions = {
	addRootSlash: false,
	ignorePath: ['src', 'dist']
    };

    var injectJSFiles = gulp.src('dist/scripts/*.js', {read: false});
    var injectJSOptions = {
	starttag: '<!-- inject:js -->',
	endtag: '<!-- endinject -->',
	ignorePath: ['src', 'dist'],
	addRootSlash: false
    };
    
    return gulp.src('src/index.html')
	.pipe(inject(injectStyles, injectOptions))
	.pipe(inject(injectJSFiles, injectJSOptions))
	.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.ts')
	.pipe(
	    ts({
                alwaysStrict: true,
		allowJs: true,
		checkJs: true,
                out: 'main.js'
	    })
	)
	.pipe(gulp.dest('dist/scripts'));
});

// Watch files for changes & reload
gulp.task('serve', ['scripts', 'styles', 'html'], function () {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'bs-dashboard',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
      // https: true,
      server: {
	  baseDir: 'dist',
	  index: 'index.html'
      },
      port: 3000
  });

    gulp.watch(['src/**/*.html'], ['html', reload]);
    gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['src/scripts/**/*.ts'], ['scripts', reload]);
    gulp.watch(['src/images/**/*'], reload);
});

gulp.task('default', ['scripts', 'styles', 'html'], function (done) {
    browserSync.reload();
    done();
});

function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}
