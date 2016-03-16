# User registration transactional message

User registration event.

**Routing key**

`user.registration.transactional`

**Exchanges**
- `transactionalExchange`

**Queueus**
- `activityStatsQueue`
- `loggingQueue`
- `mobileCommonsQueue`
- `transactionalQueue`
- `userAPIRegistrationQueue`
- `userRegistrationQueue`

**Parameters**

```js
{

  /* Required. Always must be `user_register`. */
  activity: String,

  /* Required. */
  email: String,

  /* Required. */
  uid: Number,

  /* Required, Example: `US`. */
  user_country: String,

  /* Required, Example: `en`. */
  user_language: String,

  /* Required. Example: `mb-user-register-US`. */
  email_template: String,

  /* Required. Example: `f2fab1dfd4`. */
  mailchimp_list_id: String,

  /* Required. Unix timestamp. Example: `881884800`. */
  birthdate: Number,

  /* Required. Example: `1`. */
  subscribed: Boolean,

  /* Required. Unix timestamp. Example: `1458067430`. */
  activity_timestamp: String,

  /* Required. Example: `US`. */
  application_id: String,

  /* Required. an array of string to tag the message with. Example: `drupal_user_register`. */
  email_tags: Array,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: `MEMBER_COUNT`, `FNAME` */
  merge_vars: Array,
}
```
