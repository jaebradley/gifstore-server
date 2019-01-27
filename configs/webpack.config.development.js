const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const {
//   BundleAnalyzerPlugin,
// } = require('webpack-bundle-analyzer');
const WebpackBuildNotifier = require('webpack-build-notifier');

const common = require('./webpack.config.common');

module.exports = merge.smart(
  common,
  {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new WebpackBuildNotifier({
        title: 'Gifstore Server Build',
      }),
      new HardSourceWebpackPlugin(),
    ],
    watch: true,
  },
);
