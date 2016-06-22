'use strict';

const Promise = require('bluebird');

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
      defaultsTo: '',
    },
    email: {
      type: 'string',
      required: true,
      email: true,
      defaultsTo: '',
    },
    mobile: {
      type: 'string',
      required: true,
      defaultsTo: '',
    },
    application_id: {
      type: 'string',
      defaultsTo: '',
    },
    email_template: {
      type: 'string',
    },
    toMessage() {
      const payloadPartial = Promise.join(
        NorthstarService.getUserFor(this),
        PhoenixService.User.getCount(),
        (user, count) => {
          // TODO: build using model?
          const activity = MessageBuilderService.getActivity(UserPassword);
          const emailTemplate = MessageBuilderService.getEmailTemplate(
            this.email_template, activity, user.country
          );
          const emailTags = MessageBuilderService.getEmailTags(
            activity, this.application_id
          );

          const message = {
            activity,
            email: user.email,
            uid: user.drupalID,
            merge_vars: {
              MEMBER_COUNT: count.readable,
              FNAME: user.firstName,
              RESET_LINK: null,
            },
            user_country: user.country,
            user_language: user.language,
            email_template: emailTemplate,
            email_tags: emailTags,
            activity_timestamp: MessageBuilderService.getActivityTimestamp(),
            application_id: this.application_id,
          };
          return message;
        }
      );

      const payload = Promise.join(
        payloadPartial,
        PhoenixService.User.getPasswordResetURL(),
        (data, url) => {
          const message = data;
          message.merge_vars.RESET_LINK = url;
          return message;
        }
      );
      return payload;
    },
  },

  /**
   * Validate the presences of at least one of the fields.
   */
  beforeValidate(values, cb) {
    // TODO: Replace this with custom attribute validation method:
    // https://github.com/balderdashy/waterline-docs/blob/master/models/validations.md#custom-validations

    // The list of possible fields.
    const fields = ['user_id', 'email', 'mobile'];

    // Check if at least one field is present and truthy.
    const found = fields.some(field => values[field]);

    // Turn off presence validations when at least one fields is present,
    // turn on when all fields are absent.
    fields.forEach((field) => {
      if (found) {
        // It should be possible to just set required to false,
        // but for some reason it turns off the rest of field rules.
        delete this._validator.validations[field].required;
      } else {
        // Reenable presence validation if no fields found.
        this._validator.validations[field].required = true;
      }
      return true;
    });

    // Continue.
    cb();
  },

};
