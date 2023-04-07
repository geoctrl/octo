const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const IcosetWebpackPlugin = require("@icoset/icoset-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const {
  regular,
  solid,
  light,
  sharpRegular,
  sharpSolid,
  brands,
} = require("./icons");

const icons = [
  ...regular.map((r) => ({ [`${r}-regular`]: `regular/${r}.svg` })),
  ...solid.map((s) => ({ [`${s}-solid`]: `solid/${s}.svg` })),
  ...light.map((s) => ({ [`${s}-light`]: `light/${s}.svg` })),
  ...sharpRegular.map((s) => ({
    [`${s}-sharp-regular`]: `sharp-regular/${s}.svg`,
  })),
  ...sharpSolid.map((s) => ({ [`${s}-sharp-solid`]: `sharp-solid/${s}.svg` })),
  ...brands.map((s) => ({ [`${s}-brands`]: `brands/${s}.svg` })),
];

module.exports = ({ production }) => ({
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    library: {
      type: "commonjs",
    },
  },
  mode: production ? "production" : "development",
  devtool: production ? "eval-source-map" : "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /main\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["src/styles"],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|jpg|png)$/,
        type: "asset/inline",
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(production),
    }),
    new IcosetWebpackPlugin({
      icosetOptions: {
        directory: path.resolve(
          __dirname,
          "node_modules/@fortawesome/fontawesome-pro/svgs"
        ),
        icons,
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
    // new BundleAnalyzerPlugin(),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: {
      index: "/",
    },
  },
});
