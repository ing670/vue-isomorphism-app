const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')
const cfg = require('./config')

let host = cfg.dev.host;
process.env.NODE_ENV == "production" && (host = cfg.production.host)
process.env.NODE_ENV == "development" && (host = cfg.dev.host)
process.env.NODE_ENV == "test" && (host = cfg.test.host)
module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './front/src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
        'host':JSON.stringify(host)
    }),
    new VueSSRServerPlugin()
  ]
})
