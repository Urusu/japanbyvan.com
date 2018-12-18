'use strict';

const gulp = require('gulp'),
  // markup
  pug = require('gulp-pug'),
  // content
  data = require('gulp-data'),
  imagemin = require('gulp-imagemin'),
  responsive = require('gulp-responsive'),
  md = require('jstransformer')(require('jstransformer-markdown-it')),
  // system
  del = require('del'),
  tap = require('gulp-tap'),
  //publish = require('gulp-publish'),
  // design
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  jsonImporter = require('node-sass-json-importer'),
  cssnano = require('cssnano'),
  // scripts
  webpack = require('webpack'),
  babel = require('gulp-babel'),
  webpackConfig = require('./webpack.config.babel'),
  yaml = require('js-yaml');

let images;

gulp.task('clean', () => {
  return del('./build/');
});

gulp.task('css', ['clean'], () => {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  return gulp.src('./src/**/*.scss')
    .pipe(sass({
      includePaths: [
        './node_modules',
      ],
      importer: jsonImporter,
      errLogToConsole: true
    }).on('error', sass.logError))
    //.pipe(postcss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', ['clean', 'images'], () => {
  return gulp.src('./src/*.pug')
    .pipe( data({
      images: images
    }) )
    .pipe( pug() )
    .pipe( gulp.dest('./build/') );
});

gulp.task('css:watch', () => {
  gulp.watch('./src/**/*.scss', ['css']);
});

gulp.task('images', ['clean'], () => {
  images = [];
  gulp.src('./data/**/*.{jpg,png,svg}')
    /**.pipe(tap((file) => {
      const pathStr = file.path;
      images.push(file.path.split('/').pop());
    }))
    .pipe(responsive({
      '*': {
        width: 1240
      }
    }))
    .pipe(imagemin())
    **/
    .pipe(gulp.dest('./build/images/'))
});

gulp.task('script', ['clean'], () => {
  return gulp
    .src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('lightgallery', ['clean'], () => {
  return gulp
    .src(['src/fonts/**/*', 'src/images/**/*', 'src/js/**/*', 'src/css/**/*'], {base: 'src'})
    .pipe(gulp.dest('build'));
});

gulp.task('favicon', ['clean'], () => {
  return gulp
    .src(['src/favicon/**/*'], {base: 'src'})
    .pipe(gulp.dest('build'));
});
/*
gulp.task('script', callback => {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw Error(`[webpack] ${err}`)
    callback();
  });
});*/


gulp.task('build', ['clean', 'script', 'css', 'images', 'lightgallery', 'favicon', 'html']);


gulp.task('default', ['build']);
