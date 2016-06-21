'use strict';

/**
 * Helpers services. A collection of services to be used throughout the application.
 */
module.exports = {

  isOneOfFieldSet() {
    return ['user_id', 'email', 'mobile'].every(userField => !this[userField]);
  },

};
