const path = require("path");
const webpack = require("webpack");
const FriendlyErrorPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = options => {
  const base = {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        path: path.join(process.cwd(), "dist"),
        publicPath: "/"
      },
      options.output
    ),
    module: {
      rules: [
        {
          test: /\.(ts|js)x$/,
          exclude: /(node_modules)/,
          loader: "babel-loader"
        }
      ]
    },
    plugins: options.plugins.concat([
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development"
      }),
      new FriendlyErrorPlugin(),
      new ProgressBarPlugin(),
    ]),
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": path.join(process.cwd(), "src")
      }
    },
    devtool: options.devtool,
    target: "web",
    performance: options.performance,
  };

  return base;
};
