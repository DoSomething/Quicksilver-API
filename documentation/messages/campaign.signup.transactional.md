# Campaign signup transactional message

User campaign signup event to trigger functionality within the Quicksilver system.

----

#### Current Configuration
Accessed by connecting to RabbitMQ server and sending message in the following format.

**Routing key**

`campaign.signup.transactional`

**Exchanges**

- `transactionalExchange`

**Consumers**

| Consumer                                                                  | Binding key           |
| ------------------------------------------------------------------------- | ----------------------|
| [activityStatsQueue](../queues/activityStatsQueue.md)                     |  `*.*.transactional`  |
| [loggingQueue](../queues/loggingQueue.md)                                 |  `*.*.transactional`  |
| [mailchimpCampaignSignupQueue](../queues/mailchimpCampaignSignupQueue.md) |  `campaign.signup.*`  |
| [mobileCommonsQueue](../queues/mobileCommonsQueue.md)                     |  `campaign.signup.*`  |
| [transactionalQueue](../queues/transactionalQueue.md)                     |  `*.*.transactional`  |
| [userAPICampaignActivityQueue](../queues/userAPICampaignActivityQueue.md) |  `campaign.*.*`       |

#### Current Message Payload
```js
{

  /* Required. Always must be "campaign_signup". */
  activity: String,

  /* Required. */
  email: String,

  /* Required. Phoenix user id. */
  uid: Number,

  /* Required. Phoenix campaign id. Example: "1334". */
  event_id: Number,

  /* Required, Example: "US". */
  user_country: String,

  /* Required, Example: "en". */
  user_language: String,

  /* Optional. Default is generated base on "user_country" field. Example: "mb-campaign-signup-US". */
  email_template: String,

  /* Required. Unix timestamp. Example: "1458067430". */
  activity_timestamp: Number,

  /* Required. Example: "US". */
  application_id: String,

  /* Required. An array of string to tag the message with. Example: [1334, "drupal_campaign_signup"]. */
  email_tags: Array,

  /* Required. Example: "US".  */
  campaign_country: String,

  /* Required. Always "1" as the transaction always results in the email address being subscribed. */
  subscribed: Boolean,

  /* Optional. Campaign langauge code. Example: "en". */
  campaign_language: String,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: "MEMBER_COUNT", "FNAME", "CAMPAIGN_TITLE",  */
  /* "CAMPAIGN_LINK", "CALL_TO_ACTION", "STEP_ONE", "STEP_TWO", "STEP_THREE". */
  merge_vars: Array,

}
```

----

#### Suggested API

**Endpoint**

`POST /campaign/signup`

**Body Parameters**

```js
{

  /* Required: user_id or email or mobile. Northstar user ID. Example: "555b9225bffebc31068b4567". */
  user_id: String,

  /* Required: user_id or email or mobile. */
  email: String,

  /* Required: user_id or email or mobile. */
  mobile: Integer,

  /* Required. Phoenix campaign id. Example: "1334". */
  campaign_id: Number,

  /* Required. A country of campaign user subscribed to. Example: "US". */
  campaign_country: String,

  /* Optional. The default is generated base on "user_country" value gathered */
  /* from user settings found for "email" or "user_id". */
  /* Example: "mb-campaign-signup-US". Defining this value allows */
  /* for specification of an alternative template. */
  email_template: String,

}
```

Changes:

- :x: `activity`: always `campaign_signup` for this message type
- :x: `merge_var: MEMBER_COUNT` retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `merge_var: CAMPAIGN_TITLE` value from Phoenix
- :x: `merge_var: CAMPAIGN_LINK` value from Phoenix
- :x: `merge_var: CALL_TO_ACTION` value from Phoenix
- :x: `merge_var: STEP_ONE` value from Phoenix
- :x: `merge_var: STEP_TWO` value from Phoenix
- :x: `merge_var: STEP_THREE` value from Phoenix
- :x: `merge_var: FNAME` value from Northstar
- :x: `activity_timestamp` set in Quicksilver API
- :x: `user_language` value from Northstar
- :x: `user_country` value from Northstar
- :x: `subscribed` removed, always `1` as transaction request enables user email subscription preference.
- :heavy_exclamation_mark: `event_id` renamed to `campaign_id`
- :heavy_exclamation_mark: `email_tag` will be determined from `application_id`
- :heavy_exclamation_mark: `application_id` new optional field to determine client app
- :heavy_exclamation_mark: `email_template` should be determined from `user_country` but can be defined to use specific template.
- :heavy_exclamation_mark: `user_id` Phoenix user id is replaced with [Northstar](https://github.com/DoSomething/northstar/blob/dev/documentation/endpoints/users.md#retrieve-a-user) user id.
