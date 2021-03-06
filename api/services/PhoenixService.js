'use strict';

const PhoenixClient = require('@dosomething/phoenix-js');

/**
 * A global-accessible proxy to configured PhoenixClient.
 */
module.exports = (function () {
  return new PhoenixClient({
    baseURI: sails.config.phoenix.baseURI,
    username: sails.config.phoenix.username,
    password: sails.config.phoenix.password,
  });
}());
