const path = require("path");
var glob = require("glob-all");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const mergeJSON = require("handlebars-webpack-plugin/utils/mergeJSON");
const WebpackRemoveEmptyScripts = require("webpack-remove-empty-scripts");

//Project Data files
const projectData = mergeJSON(path.join(__dirname, "/src/data/**/*.json"));

//Purgecss paths
const purgeCssPaths = {
  src: path.join(__dirname, "src", "html"),
  partials: path.join(__dirname, "src", "partials"),
};

// paths used in various placed in webpack config
const paths = {
  src: {
    imgs: "./src/assets/images",
    scss: "./src/assets/scss",
    fonts: "./src/assets/fonts",
    webFonts:"./src/assets/webfonts",
    js: "./src/assets/js",
  },
  dist: {
    imgs: "./assets/images",
    css: "./assets/css",
    fonts: "./assets/fonts",
    webFonts:"./assets/webfonts",
    js: "./assets/js",
  },
};

// Main webpack config options.

const wPackConfig = {
  mode: "development",
  entry: {
    libs: [paths.src.scss + "/libs.scss"],
    theme: [paths.src.js + "/theme.js", paths.src.scss + "/theme.scss"],
    dashboardCharts: [paths.src.js + "/dashboard-charts.js"],
    calendarCustom:[paths.src.js + "/calendar-custom.js"],
    datatablesCustom:[paths.src.js + "/datatables-custom.js"],
  },
  output: {
    filename: paths.dist.js + "/[name].bundle.js",
  },
  devtool: "source-map",
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "src"),
      },
    ],
    port: 3000,
    open: true,
    client: {
        overlay: true,
        progress: true,
        webSocketTransport: 'ws',
      },
    hot: true,
    liveReload:true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        include: path.resolve(__dirname, paths.src.scss.slice(2)),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  //   externals: {
  //     jquery: "jQuery",
  //   },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules)[\\/].+\.js$/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.fonts,
          to: paths.dist.fonts,
          noErrorOnMissing: true,
        },
        {
          from: paths.src.imgs,
          to: paths.dist.imgs,
          noErrorOnMissing: true,
        },
        {
          from: paths.src.webFonts,
          to: paths.dist.webFonts,
          noErrorOnMissing: true,
        },
      ],
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "html", "**", "*.html"),
      output: path.join(process.cwd(), "dist", "[path]", "[name].html"),
      partials: [
        path.join(process.cwd(), "src", "partials", "**", "*.{html,svg}"),
      ],
      data: projectData,
      helpers: {
        webRoot: function () {
          return "{{webRoot}}";
        },
        config: function (data) {
          return data;
        },
        ifEquals: function (arg1, arg2, options) {
          if (arg1 === arg2) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        log: function (data) {
          console.log(data);
        },
        limit: function (arr, limit) {
          if (!Array.isArray(arr)) {
            return [];
          }
          return arr.slice(0, limit);
        },
      },
      onBeforeSave: function (Handlebars, res, file) {
        const elem = file.split("//").pop().split("/").length;
        return res.split("{{webRoot}}").join(".".repeat(elem));
      },
    }),
    new WebpackRemoveEmptyScripts(),
    new MiniCssExtractPlugin({
      filename: paths.dist.css + "/[name].bundle.css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(
        [`${purgeCssPaths.src}/**/*`, `${purgeCssPaths.partials}/**/*`],
        { nodir: true }
      ),
      safelist: {
        greedy: [
          /show$/,
          /collapsing$/,
          /data/,
          /reveal/,
          /show-filters/,
          /modal/,
          /collapse/,
          /slideout/,
        ],
      },
    }),
  ],
};

//webpack module exports
module.exports = wPackConfig;
