// Webpack uses this to work with directories
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },

  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              // only enable hot in development
              hmr: process.env.NODE_ENV === "development",
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            }
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "postcss.config.js"
              }
            }
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass")
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              // List of auto importated variables
              resources: ["./src/scss/vars.scss", "./src/scss/mixins.scss"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin("[name].min.css", {
      allChunks: true
    })
  ]
};
