'use strict';

const gulp = require('gulp'),
  // markup
  pug = require('gulp-pug'),
  // content
  data = require('gulp-data'),
  imagemin = require('gulp-imagemin'),
  //responsive = require('gulp-responsive'),
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

gulp.task('css', () => {
  const plugins = [
    autoprefixer({overrideBrowserslist: ['last 2 versions']}),
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
    .pipe(postcss())
    .pipe(gulp.dest('./build/en/css'))
    .pipe(gulp.dest('./build/jp/css'));
});

gulp.task('html-en', () => {
  return gulp.src('./src/*.pug')
    .pipe( data({
      images: images,
      lng: "en"
    }) )
    .pipe( pug() )
    .pipe( gulp.dest('./build/en/') );
});

gulp.task('html-jp', () => {
  return gulp.src('./src-jp/*.pug')
    .pipe( data({
      images: images,
      lng: "jp"
    }) )
    .pipe( pug() )
    .pipe( gulp.dest('./build/jp/') );
  });

gulp.task('css:watch', () => {
  gulp.watch('./src/**/*.scss', ['css']);
});

gulp.task('images', (done) => {
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
    .pipe(gulp.dest('./build/en/images/'))
    .pipe(gulp.dest('./build/jp/images/'))
    done();
});

gulp.task('script', () => {
  return gulp
    .src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/en'))
    .pipe(gulp.dest('build/jp'));
});

gulp.task('docs', () => {
  return gulp
    .src(['data/**/*.pdf', 'data-jp/**/*.pdf'])
    .pipe(gulp.dest('build/en'))
    .pipe(gulp.dest('build/jp'));
});

gulp.task('lightgallery', () => {
  return gulp
    .src(['src/fonts/**/*', 'src/images/**/*', 'src/js/**/*', 'src/css/**/*'], {base: 'src'})
    .pipe(gulp.dest('build/en'))
    .pipe(gulp.dest('build/jp'));
});

gulp.task('favicon', () => {
  return gulp
    .src(['src/favicon/**/*'], {base: 'src'})
    .pipe(gulp.dest('build/en'))
    .pipe(gulp.dest('build/jp'));
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


gulp.task('build', gulp.series('clean', gulp.parallel('script', 'css', 'images', 'lightgallery', 'favicon', 'docs'), gulp.series('html-en','html-jp')));


gulp.task('default', gulp.series('build'));
