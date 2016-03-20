module.exports = {
  output: {
    filename: 'bundle.js'
  },

  devtool: 'sourcemap',

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/www\/lib/, /node_modules/, /\.spec\.js/] }
    ]
  },

  stylus: {
    use: [require('jeet')(), require('rupture')()]
  }
};
