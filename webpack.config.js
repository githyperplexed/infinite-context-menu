const webpack = require("webpack"),
  path = require("path");

const CopyPlugin = require("copy-webpack-plugin"),
  HtmlPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  const config = {
    entry: "./infinite-client/index.tsx",
    output: {
      filename: "index.[fullhash].js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new HtmlPlugin({
        template: path.resolve(__dirname, "infinite-client/index.html")
      })  
    ]
  };

  if(env.local) {
    config.output.path = path.resolve(__dirname, "");

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ],
    });

    config.devServer = {
      port: 3001,
      historyApiFallback: true,
      open: true,
      hot: true
    }
  } else {
    config.output.path = path.resolve(__dirname, "public");

    config.module.rules.push({
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    });
  
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "index.[fullhash].css",
      })
    );
  }
  
  return config;
}