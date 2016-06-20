'use strict';

/**
 * Helpers services. A collection of services to be used throughout the application.
 */
module.exports = {

  isOneOfFieldSet(submission) {
    return ['user_id', 'email', 'mobile'].every(userField => !submission[userField]);
  },

};
