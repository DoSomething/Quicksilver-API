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
      hexadecimal: true,
      required() {
        return HelpersService.validateModelIsOneOfIdParams(this);
      },
    },
    email: {
      type: 'string',
      email: true,
      required() {
        return HelpersService.validateModelIsOneOfIdParams(this);
      },
    },
    mobile: {
      type: 'string',
      required() {
        return HelpersService.validateModelIsOneOfIdParams(this);
      },
    },
    application_id: {
      type: 'string',
      defaultsTo: '',
    },
    email_template: {
      type: 'string',
    },
    toMessage() {
      const payload = Promise.join(
        NorthstarService.getUserFor(this),
        PhoenixService.User.getCount(),
        (user, count) => {
          // TODO: build using model?
          const activity = MessageBuilderService.getActivity(UserPassword);
          const emailTemplate = MessageBuilderService.getEmailTemplate(
            this.email_template,
            activity,
            user.country);
          const emailTags = MessageBuilderService.getEmailTags(activity, this.application_id);

          return PhoenixService.User.getPasswordResetURL(user.drupalID)
            .then((resetPasswordUrl) => {
              const message = {
                activity,
                email: user.email,
                uid: user.drupalID,
                merge_vars: {
                  MEMBER_COUNT: count.readable,
                  FNAME: user.firstName,
                  RESET_LINK: resetPasswordUrl,
                },
                user_country: user.country,
                user_language: user.language,
                email_template: emailTemplate,
                email_tags: emailTags,
                activity_timestamp: MessageBuilderService.getActivityTimestamp(),
                application_id: this.application_id,
              };
              return message;
            });
        });
      return payload;
    },
  },

};
