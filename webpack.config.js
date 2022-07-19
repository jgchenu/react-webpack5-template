const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const __DEV__ = process.env.NODE_ENV === "development";
console.log('current env', process.env.NODE_ENV)
const ROOT_PATH = path.resolve(__dirname, ".");
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'output');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  devtool: __DEV__ ? 'cheap-module-source-map' : 'source-map',
  entry: path.resolve(ROOT_PATH, "./src/index.tsx"),
  output: {
    filename: "[name].js",
    filename: __DEV__ ? '[name].js' : 'js/[name]-[contenthash].js',
    chunkFilename: __DEV__ ? '[name].js' : 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    compress: true,
    open: false,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
  },

  mode: "production",
  // cache: {
  //   type: "filesystem",
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:8]',
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './static/template.html'),
      minify: {
        collapseWhitespace: !__DEV__,
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [OUTPUT_PATH],
    }),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? "[name].css" : "[name]-[contenthash].css",
      chunkFilename: __DEV__ ? "[name].css" : "[name]-[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};



module.exports = config;