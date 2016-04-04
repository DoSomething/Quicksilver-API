# User registration transactional message

User registration event to trigger functionality within the Quicksilver system. Each queue bound to the exchange will have messages distributed to the consumer applicaiton based on the queue binding key.

----

#### Current Configuration
Accessed by connecting to RabbitMQ server and sending message in the following format.

**Routing key**

`user.registration.transactional`

**Exchanges**
- `transactionalExchange`

**Queues**

| Name                                                              | Binding key           |
| ----------------------------------------------------------------- | ----------------------|
| [activityStatsQueue](../queues/activityStatsQueue.md)             |  `*.*.transactional`  |
| [loggingQueue](../queues/loggingQueue.md)                         |  `*.*.transactional`  |
| [mobileCommonsQueue](../queues/mobileCommonsQueue.md)             |  `user.registration.*`|
| [transactionalQueue](../queues/transactionalQueue.md)             |  `*.*.transactional`  |
| [userAPIRegistrationQueue](../queues/userAPIRegistrationQueue.md) |  `user.registration.#`|
| [userRegistrationQueue](../queues/userRegistrationQueue.md)       |  `user.registration.*`|

#### Current Message Payload

```js
{

  /* Required. Always must be `user_register`. */
  activity: String,

  /* Required. */
  email: String,

  /* Required. Phoenix user id. */
  uid: Number,

  /* Required, Example: `US`. */
  user_country: String,

  /* Required, Example: `en`. */
  user_language: String,

  /* Optional. Default is generated base on `user_country` field. Example: `mb-user-register-US`. */
  email_template: String,

  /* Required. Example: `f2fab1dfd4`. */
  mailchimp_list_id: String,

  /* Required. Unix timestamp. Example: `881884800`. */
  birthdate: Number,

  /* Required. Always `1` as the transaction always results in the email address being subscribed. */
  subscribed: Boolean,

  /* Required. Unix timestamp. Example: `1458067430`. */
  activity_timestamp: Number,

  /* Required. Example: `US`. */
  application_id: String,

  /* Required. An array of string to tag the message with. Example: `drupal_user_register`. */
  email_tags: Array,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: `MEMBER_COUNT`, `FNAME` */
  merge_vars: Array,

}
```
