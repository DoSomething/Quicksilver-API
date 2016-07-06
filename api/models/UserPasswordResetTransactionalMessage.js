'use strict';

/**
 * UserPasswordResetTransactionalMessage.js
 *
 * @description :: Describes User password reset transactional message
 * @docs        :: https://github.com/DoSomething/quicksilver-api/blob/master/documentation/messages/user.password_reset.transactional.md
 */

module.exports = {
  // Allow only whitelisted attributes.
  schema: true,

  // Turn off migrations.
  migrate: 'safe',

  // Turn off auto fields.
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: true,

  // Attributes.
  attributes: {
    data: {
      model: 'UserPassword',
      required: true,
    },
    activity() {
      return 'user_password';
    },
  },
  // End Attributes.
};


/*

{
  "activity": "user_password",
  "email": "test@dosomething.org",
  "uid": "187",
  "merge_vars": {
    "MEMBER_COUNT": "3.5 million",
    "FNAME": "test",
    "RESET_LINK": "https://staging.beta.dosomething.org/user/reset/187/1467836132/tPAa-fBOa46MqT2VKNhdzEejwWAIv34fqB7vwhX-BvY/login"
  },
  "user_country": "US",
  "user_language": "en-global",
  "email_template": "mb-user-password-US",
  "email_tags": [
    "user_password"
  ],
  "activity_timestamp": 1467836132,
  "application_id": ""
}

 */
