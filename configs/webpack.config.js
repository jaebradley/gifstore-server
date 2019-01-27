const developmentConfig = require('./webpack.config.development');
const productionConfig = require('./webpack.config.production');

const ENV = process.env.ENV || 'development';
let config = developmentConfig;

// eslint-disable-next-line no-console
console.log('ENVIRONMENT IS', ENV);

if (ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log('using production configuration');
  config = productionConfig;
}

module.exports = config;
