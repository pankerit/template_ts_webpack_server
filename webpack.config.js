const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
  const config = {}

  if (isProd) {
    config.minimize = true
    config.minimizer = [
      new TerserWebpackPlugin()
    ]
  }
  return config
}
const plugins = () => {
  return [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new NodemonPlugin(),
  ]
}
const alias = () => {
  return {
    '~': path.resolve(__dirname, 'src')
  }
}


module.exports = (_env, _argv) => {
  const config = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : 'source-map',

    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
      publicPath: 'dist/',
      libraryTarget: 'this',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader'
          },
          exclude: /node_modules/,
        }
      ]
    },

    resolve: {
      extensions: ['.ts', '.js'],
      alias: alias()
    },

    plugins: plugins(),
    optimization: optimization(),
    target: 'node',
    externals: [
      nodeExternals()
    ],

    stats: 'minimal',
  }

  // debug
  if (isDev) config.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]'

  return config
}
