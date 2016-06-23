'use strict';

/**
 * A collection of helper services to be used throughout the application.
 */
module.exports = {

  /**
   * Test model values for at least one of user_id, email or mobile. Typically this is a
   * requirement by Northstar user lookups.
   *
   * @returns {boolean}
   */
  validateModelIsOneOfIdParams(model) {
    return ['user_id', 'email', 'mobile'].every(userField => !model[userField]);
  },

};
