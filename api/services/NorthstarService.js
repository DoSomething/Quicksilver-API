'use strict';

const NorthstarClient = require('@dosomething/northstar-js');

/**
 * Nortstar client service.
 */
module.exports = {

  getClient() {
    if (!this.client) {
      this.client = new NorthstarClient({
        baseURI: sails.config.northstar.apiBaseURI,
        apiKey: sails.config.northstar.apiKey,
      });
    }
    return this.client;
  },

  getUserFor(model) {
    const options = this.resolveRequestId(model);
    return this.getClient().getUser(options.type, options.id);
  },

  resolveRequestId(model) {
    let id;
    let type;

    if (model.user_id) {
      type = 'id';
      id = model.user_id;
    } else if (model.email) {
      type = 'email';
      id = model.email;
    } else if (model.mobile) {
      type = 'mobile';
      id = model.mobile;
    }

    return { type, id };
  },

};
