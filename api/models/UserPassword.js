'use strict';

const Promise = require('bluebird');

/*
 * Validate that at least one of the user fields have a value
 *
 * @param string userField
 *   The name of the field
 */
function isOneOfFieldSet() {
  // TODO: Move to module
  return ['user_id', 'email', 'mobile'].every(userField => !this[userField]);
}

/**
 * UserPassword
 *
 * @description :: Accepts and validates incoming POST request for user password.
 * @help        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  // Allow only whitelisted attributes.
  schema: true,

  // Turn off migrations.
  migrate: 'safe',

  // Turn off auto fields.
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  // Validation rules.
  attributes: {
    user_id: {
      type: 'string',
      required: NorthstarService.isOneOfFieldSet(this),
      hexadecimal: true,
      defaultsTo: '',
    },
    email: {
      type: 'string',
      required: NorthstarService.isOneOfFieldSet(this),
      email: true,
      defaultsTo: '',
    },
    mobile: {
      type: 'string',
      required: NorthstarService.isOneOfFieldSet(this),
      defaultsTo: '',
    },
    application_id: {
      type: 'string',
    },
    email_template: {
      type: 'string',
    },
    toMessage() {
      return Promise.join(
        NorthstarService.getUserFor(this),
        PhoenixService.User.getCount(),
        (user, count) => {
          const message = {
            activity: 'user_password',
            email: user.email,
            uid: user.drupalID,
            merge_vars: {
              MEMBER_COUNT: count.readable,
              FNAME: user.firstName,
              RESET_LINK: null,
            },
            user_country: user.country,
            user_language: user.language,
            email_template: null,
            email_tags: ['user_password'],
            activity_timestamp: null,
            application_id: null,
          };
          return message;
        }
      );
    },
  },

};
