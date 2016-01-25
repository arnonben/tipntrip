// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
<<<<<<< HEAD
// Generated on 2015-12-31 using
// generator-karma 1.0.0
=======
// Generated on 2016-01-04 using
// generator-karma 1.0.1
>>>>>>> 5499722b43192f31d826514ffb5f20afca3ad0d8

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
<<<<<<< HEAD
    basePath: '',
=======
    basePath: '../',
>>>>>>> 5499722b43192f31d826514ffb5f20afca3ad0d8

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
<<<<<<< HEAD
=======
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-emoji-popup/dist/js/config.js',
      'bower_components/angular-emoji-popup/dist/js/emoji.min.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/lib/**/*.js",
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
>>>>>>> 5499722b43192f31d826514ffb5f20afca3ad0d8
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
