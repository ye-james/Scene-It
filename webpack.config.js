const path = require("path");
const HtmlWebppackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebppackPlugin({
      template: path.join(__dirname, "client", "index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    hot: true,
  },
};
