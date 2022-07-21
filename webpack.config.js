const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const __DEV__ = process.env.NODE_ENV === 'development';
const ROOT_PATH = path.resolve(__dirname, '.');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const mode = __DEV__ ? 'development' : 'production';
const fs = require('fs');

const styleLoaderOrMiniCssLoader = __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader;
const config = {
  mode,
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  entry: path.resolve(ROOT_PATH, './src/index.tsx'),
  output: {
    filename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    chunkFilename: __DEV__ ? '[name].js' : '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    compress: true,
    open: false,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
        include: /node_modules/,
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      context: path.resolve(ROOT_PATH, 'src'),
      files: ['**/*.css', '**/*.less'],
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './static/template.html'),
      minify: {
        collapseWhitespace: !__DEV__,
      },
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      failOnError: !__DEV__,
      extensions: ['js', 'ts', 'jsx', 'tsx'],
    }),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
      chunkFilename: __DEV__ ? '[name].css' : '[name]-[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {},
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

// hmr react
if (__DEV__) {
  config.plugins.push(new ReactRefreshWebpackPlugin());
}

// tsconfig paths to webpack alis
const tsconfig = fs.readFileSync('./tsconfig.json', 'utf-8');
const tsPaths = JSON.parse(tsconfig).compilerOptions.paths;
const alias = {};
Object.keys(tsPaths).forEach((key) => {
  const tsPath = tsPaths[key][0];
  const aliasKey = key.replace('/*', '');
  const aliasPath = tsPath.replace('/*', '');
  alias[aliasKey] = path.resolve(ROOT_PATH, aliasPath);
});
config.resolve.alias = Object.assign({}, alias, config.resolve.alias);

module.exports = config;

console.log('current env', process.env.NODE_ENV);
