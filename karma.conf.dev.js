module.exports = function(config) {
  config.set({
    autoWatchBatchDelay: 100,
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      {pattern: 'spec.bundle.js', watched: false}
    ],
    exclude: [],

    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap']
    },
      
      files: [
  '../www/lib/angular/angular.js',
  '../www/js/*.js',
  '../www/lib/angular-mocks/angular-mocks.js',
  '**/tests/*spec.js'
],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.html$/, loader: 'raw'},
          {test: /\.styl$/, loader: 'style!css!stylus'},
          {test: /\.css/, loader: 'style!css'},
          {
            test: /\.js$/,
            loader: 'babel?stage=1',
            exclude: [/www\/lib/, /node_modules/]
          }
        ]
      },

      stylus: {
        use: [require('jeet')(), require('rupture')()]
      }
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha', 'growl'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
