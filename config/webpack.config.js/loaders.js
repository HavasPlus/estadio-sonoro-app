const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateSourceMap = process.env.OMIT_SOURCEMAP === "true" ? false : true;
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const paths = require("./paths");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const babelLoader = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve("babel-loader"),
  options: {
    customize: require.resolve("babel-preset-react-app/webpack-overrides"),
    plugins: [
      [
        require.resolve("babel-plugin-named-asset-import"),
        {
          loaderMap: {
            svg: {
              ReactComponent: "@svgr/webpack?-prettier,-svgo![path]"
            }
          }
        }
      ]
    ],
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === "production",
    compact: process.env.NODE_ENV === "production"
  }
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        camelCase: true,
        modules: true,
        importLoaders: 1,
        sourceMap: generateSourceMap,
        // localIdentName: '[name]__[local]--[hash:base64:5]',
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ]
};

// CSS
const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin.loader,
    require.resolve("css-loader"),
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ]
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: require.resolve("css-loader"),
      options: {
        exportOnlyLocals: true,
        camelCase: true,
        importLoaders: 1,
        modules: true,
        // localIdentName: '[name]__[local]--[hash:base64:5]',
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ]
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, require.resolve("css-loader")]
};

// scss
const scssModuleLoaderClient = {
  test: sassModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: {
        camelCase: true,
        modules: true,
        importLoaders: 2,
        sourceMap: generateSourceMap,
        // localIdentName: '[name]__[local]--[hash:base64:5]',
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    },
    {
      loader: require.resolve("sass-loader"),
      options: {
        includePaths: [require("path").resolve(__dirname, "node_modules")],
        sourceMap: generateSourceMap,
        data: `@import "src/shared/styles/variables.scss";
                 @import "src/shared/styles/global-style.scss";`
      }
    }
  ]
};

const scssLoaderClient = {
  test: sassRegex,
  exclude: sassModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin.loader,
    require.resolve("css-loader"),
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    },
    {
      loader: require.resolve("sass-loader"),
      options: {
        includePaths: [require("path").resolve(__dirname, "node_modules")],
        sourceMap: generateSourceMap,
        data: `@import "src/shared/styles/variables.scss";
                 @import "src/shared/styles/global-style.scss";`
      }
    }
  ]
};

const scssModuleLoaderServer = {
  test: sassModuleRegex,
  use: [
    {
      loader: require.resolve("css-loader"),
      options: {
        exportOnlyLocals: true,
        camelCase: true,
        importLoaders: 1,
        modules: true,
        // localIdentName: '[name]__[local]--[hash:base64:5]',
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    {
      loader: require.resolve("sass-loader"),
      options: {
        includePaths: [require("path").resolve(__dirname, "node_modules")],
        sourceMap: generateSourceMap,
        data: `@import "src/shared/styles/variables.scss";
                 @import "src/shared/styles/global-style.scss";`
      }
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ]
};

const scssLoaderServer = {
  test: sassRegex,
  exclude: sassModuleRegex,
  use: [
    require.resolve("css-loader"),
    {
      loader: require.resolve("sass-loader"),
      options: {
        includePaths: [require("path").resolve(__dirname, "node_modules")],
        sourceMap: generateSourceMap,
        data: `@import "src/shared/styles/variables.scss";
                 @import "src/shared/styles/global-style.scss";`
      }
    }
  ]
};

const urlLoaderClient = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "assets/[name].[hash:8].[ext]"
  }
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false
  }
};

const fileLoaderClient = {
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "assets/[name].[hash:8].[ext]"
      }
    }
  ]
};

const favIconLoader = {
  include: [/\.(ico)$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "[name].[ext]"
      }
    }
  ]
};

const fileLoaderServer = {
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "assets/[name].[hash:8].[ext]",
        emitFile: false
      }
    }
  ]
};

const client = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoaderClient,
      cssLoaderClient,
      scssLoaderClient,
      scssModuleLoaderClient,
      urlLoaderClient,
      fileLoaderClient,
      favIconLoader
    ]
  }
];
const server = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoaderServer,
      cssLoaderServer,
      scssLoaderServer,
      scssModuleLoaderServer,
      urlLoaderServer,
      fileLoaderServer
    ]
  }
];

module.exports = {
  client,
  server
};
