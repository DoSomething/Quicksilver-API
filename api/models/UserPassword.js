'use strict';

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
      required: true,
      hexadecimal: true,
      defaultsTo: ""
    },
    email: {
      type: 'string',
      required: true,
      email: true,
      defaultsTo: ""
    },
    mobile: {
      type: 'string',
      required: true,
      defaultsTo: ""
    },
    application_id: {
      type: 'string'
    },
    email_template: {
      type: 'string'
    }
  },

  // Validate the presences of at least one of the fields.
  beforeValidate(values, cb) {
    // The list of possible fields.
    const fields = ['user_id', 'email', 'mobile'];

    // Check if at least one field is present.
    let found = false;
    for (let i = 0; i < fields.length; i++) {
      var field = fields[i];
      if ((values[field] != null) && !_.isEmpty(values[field])) {
        found = true;
        break;
      }
    }

    // Turn off presence validations when at least one fields is present,
    // turn on when all fields are absent.
    for (let j = 0; j < fields.length; j++) {
      var field = fields[j];
      if (found) {
        // It should be possible to just set required to false,
        // but for some reason it turns off the rest of field rules.
        delete this._validator.validations[field].required;
      } else {
        // Reenable presence validation if no fields found.
        this._validator.validations[field].required = true;
      }
    }

    // Continue.
    cb();
  }
};
