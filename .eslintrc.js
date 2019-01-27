module.exports = {
  "settings": {
    'import/resolver': {
      "webpack": {
          "config": "./configs/webpack.config.common.js"
      },
    },
  },
  "extends": "eslint-config-airbnb",
  "env": {
    "jest": true,
    "node": true,
  },
  "parser": "babel-eslint",
}
