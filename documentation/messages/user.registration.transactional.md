# User registration transactional message

User registration event to trigger functionality within the Quicksilver system. Each queue bound to the exchange will have messages distributed to the consumer applicaiton based on the queue binding key.

----

#### Current Configuration
Accessed by connecting to RabbitMQ server and sending message in the following format.

**Routing key**

`user.registration.transactional`

**Exchanges**
- `transactionalExchange`

**Queues and binding keys**

| Queue                      | Binding key           | Consumer Application               | Description
| -------------------------- | --------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| `activityStatsQueue`       | `*.*.transactional`   | [mbp-externalApplications-dashboard](https://github.com/DoSomething/mbp-externalApplications-dashboard) | Application in office lobby that displays user registration activity. |
| `loggingQueue`             | `*.*.transactional`   | [mbc-logging-gateway](https://github.com/DoSomething/Quicksilver-PHP/tree/master/mbc-logging-gateway)   | Log tranaction to `mb-logging` database.                              |
| `mobileCommonsQueue`       | `user.registration.*` | [mbc-registration-mobile](https://github.com/DoSomething/mbc-registration-mobile)                       | Send welcome SMS message.                                             |
| `transactionalQueue`       | `*.*.transactional`   | [mbc-transactional-email](https://github.com/DoSomething/mbc-transactional-email)                       | Send welcome email message.                                           |
| `userAPIRegistrationQueue` | `user.registration.#` | [mbc-userAPI-registration](https://github.com/DoSomething/mbc-userAPI-registration)                     | Create user document in `mb-users` database.                          |
| `userRegistrationQueue`    | `user.registration.*` | [mbc-registration-email](https://github.com/DoSomething/mbc-registration-email)                         | Create MailChimp user account.                                        |

#### Current Parameters

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
  activity_timestamp: String,

  /* Required. Example: `US`. */
  application_id: String,

  /* Required. An array of string to tag the message with. Example: `drupal_user_register`. */
  email_tags: Array,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: `MEMBER_COUNT`, `FNAME` */
  merge_vars: Array,

}
```
----

#### Suggested API

**Endpoint**

`POST /user/register`

**Body Parameters**

```js
{

  /* Required: user_id or email or mobile. Northstar user ID. Example: '555b9225bffebc31068b4567'. */
  user_id: String,

  /* Required: user_id or email or mobile. */
  email: String,

  /* Required: user_id or email or mobile. */
  mobile: Integer,

  /* Optional. A string to tag the message with that can be referenced in Mandrill. Example: `drupal_user_register`. */
  registration_source: String,

  /* Optional. Used to determine the origin of the request as a site in multisite environment. Default: `US`. */
  application_id: String,

  /* Optional. The default is generated base on `user_country` value gathered from user settings found for `email` or `user_id`. Example: `mb-user-register-US`. Defining this value allows for specification of an alternative template. */
  email_template: String,

}
```

Changes:

- :x: `activity`: always `user_register` for this message type
- :x: `merge_var: MEMBER_COUNT` retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `activity_timestamp` set in Quicksilver API
- :x: `mailchimp_list_id` determined in API
- :x: `subscribed` removed, always `1` as transaction request enables user email subscription preference.
- :x: `fname` value from Northstar
- :x: `merge_var: FNAME` value from Northstar
- :x: `user_language` value from Northstar
- :x: `birthdate` value from Northstar
- :heavy_exclamation_mark: `email_tag` is replaced with optional `registration_source`
- :heavy_exclamation_mark: `application_id` optional, defaults to US
- :heavy_exclamation_mark: `email_template` should be determined from `user_country` but can be defined to use specific template.
- :heavy_exclamation_mark: `birthdate` format changed to [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
- :heavy_exclamation_mark: `user_id` Phoenix user id is replaced with [Northstar](https://github.com/DoSomething/northstar/blob/dev/documentation/endpoints/users.md#retrieve-a-user) user id.
