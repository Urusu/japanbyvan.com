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
  ghPages = require('gulp-gh-pages'),
  publish = require('gulp-publish'),
  // design
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  jsonImporter = require('node-sass-json-importer'),
  cssnano = require('cssnano'),
  // scripts
  webpack = require('webpack'),
  babel = require('gulp-babel'),
  webpackConfig = require('./webpack.config.babel');

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
  return gulp.src('./src/index.pug')
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
  return gulp.src('./data/images/*')
    .pipe(tap((file) => {
      const pathStr = file.path;
      images.push(file.path.split('/').pop());
    }))
    .pipe(responsive({
      '*': {
        width: 1240
      }
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
});

gulp.task('script', ['clean'], () => {
  return gulp
    .src('src/*.js')
    .pipe(babel())
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


gulp.task('build', ['clean', 'script', 'css', 'images', 'html']);

gulp.task('deploy', ['build'], () => {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});


gulp.task('default', ['build']);
