module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../../',

    frameworks: ['jasmine'],

    files: [
      // libraries
      'public/bower_components/jquery/jquery.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-mocks/angular-mocks.js',      
      'public/bower_components/slick-carousel/slick/slick.js',

      // source code
      'dist/slick.js',

      // tests
      'test/unit/spec/*.js'
    ],

    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false,

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  });
};
