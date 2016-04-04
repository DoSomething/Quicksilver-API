# User password reset transactional message

User password reset event to trigger functionality within the Quicksilver system.

----

#### Current Configuration
Accessed by connecting to RabbitMQ server and sending message in the following format.

**Routing key**

`user.password_reset.transactional`

**Exchanges**
- `transactionalExchange`

**Queues**

| Name                                                  | Binding key           |
| ------------------------------------------------------| ----------------------|
| [activityStatsQueue](../queues/activityStatsQueue.md) |  `*.*.transactional`  |
| [loggingQueue](../queues/loggingQueue.md)             |  `*.*.transactional`  |
| [transactionalQueue](../queues/transactionalQueue.md) |  `*.*.transactional`  |

#### Current Message Payload

```js
{

  /* Required. Always must be `user_password`. */
  activity: String,

  /* Required. */
  email: String,

  /* Required. Phoenix user id. */
  uid: Number,

  /* Required, Example: `US`. */
  user_country: String,

  /* Required, Example: `en`. */
  user_language: String,

  /* Optional. Default is generated base on `user_country` field. Example: `mb-user-password-US`. */
  email_template: String,

  /* Required. Unix timestamp. Example: `1458067430`. */
  activity_timestamp: Number,

  /* Required. Example: `US`. */
  application_id: String,

  /* Required. An array of string to tag the message with. Example: `drupal_user_password`. */
  email_tags: Array,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: `MEMBER_COUNT`, `FNAME`, 'RESET_LINK' */
  merge_vars: Array,

}
```
