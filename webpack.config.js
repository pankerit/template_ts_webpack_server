const path = require('path')

const conf = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
    //   {
    //     test: /\.m?js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: 'babel-loader',
    //     }
    //   }
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  target: 'node',
}

module.exports = (env, options) => {
  conf.devtool = (options.mode === 'production') ? false : "cheap-module-eval-source-map"
  conf.watch = (options.mode === 'production') ? false : true
  return conf
}