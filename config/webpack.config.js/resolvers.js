const paths = require("../paths");
const helpers = require("./helpers");

module.exports = {
  extensions: [".js", ".mjs", ".json", ".jsx", ".ts", ".tsx", ".css"],
  modules: paths.resolveModules,
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    "@app": helpers.root("src/shared"),
    "@assets": helpers.root("src/assets"),
    "@node_modules": helpers.root("node_modules"),
    "react-native": "react-native-web"
    // UNCOMMENT THIS TO ENABLE PREACT
    // 'react': 'preact-compat',
    // 'react-dom': 'preact-compat',
    // 'react-addons-test-utils': 'preact-test-utils',
    // 'react-addons-css-transition-group': 'preact-css-transition-group'
  }
};
