# User registration transactional message

User registration event.

**Routing key**

`user.registration.transactional`

**Exchanges**
- `transactionalExchange`

**Queues and binding keys**

| Queue                      | Binding key           |
| -------------------------- | --------------------- |
| `activityStatsQueue`       | `*.*.transactional`   |
| `loggingQueue`             | `*.*.transactional`   |
| `mobileCommonsQueue`       | `campaign.signup.*`   |
| `transactionalQueue`       | `*.*.transactional`   |
| `userAPIRegistrationQueue` | `user.registration.#` |
| `userRegistrationQueue`    | `user.registration.*` |

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

  /* Required. An array of string to tag the message with. Example: `drupal_user_register`. */
  email_tags: Array,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: `MEMBER_COUNT`, `FNAME` */
  merge_vars: Array,

}
```

#### Suggested API

**Endpoint**

`POST /user/register`

**Body Parameters**

```js
{

  /* Required. */
  uid: Number,

  /* Required. */
  email: String,

  /* Required. First name. */
  first_name: String,

  /* Required, Example: `US`. */
  country: String,

  /* Required, Example: `en`. */
  language: String,

  /* Required. ISO-8601 formatted date. Example: `2016-03-16`. */
  birthdate: String,

  /* Required. Example: `1`, `false`. */
  subscribed: Boolean,

  /* Optional. A string to tag the message with. Example: `drupal_user_register`. */
  registration_source: String,

  /* Optional. Used to determined a site in multisite environment. Default: `US`. */
  application_id: String,

}
```

Changes:

- :x: `activity`: it will always be set to `user_register` for this message type
- :x: `MEMBER_COUNT` can be retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `activity_timestamp` can be set in Quicksilver API
- :x: `mailchimp_list_id` should be determined in this API
- :heavy_exclamation_mark: `email_tag` is replaced with optional `registration_source`
- :heavy_exclamation_mark: `application_id` optional, defaults to US
- :heavy_exclamation_mark: `fname` replaced with `first_name` and moved to the top level
- :heavy_exclamation_mark: `email_template` should be determined from `user_country`
- :heavy_exclamation_mark: `user_country` renamed to `country`
- :heavy_exclamation_mark: `user_language` renamed to `language`
- :heavy_exclamation_mark: `birthdate` format changed to [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
