// environment.js
const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
        '@property': path.resolve(__dirname, '..', '..', 'app/javascript/src/property'),
    }
  }
}

environment.config.merge(customConfig);

module.exports = environment
