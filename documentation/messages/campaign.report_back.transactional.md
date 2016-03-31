# Campaign report back transactional message

User campaign report back event to trigger functionality within the Quicksilver system.

----

#### Current Configuration
Accessed by connecting to RabbitMQ server and sending message in the following format.

**Routing key**

`campaign.report_back.transactional`

**Exchanges**

- `transactionalExchange`

**Consumers**

| Consumer                                                                  | Binding key                           |
| ------------------------------------------------------------------------- | ------------------------------------- |
| [activityStatsQueue](../queues/activityStatsQueue.md)                     |  `*.*.transactional`                  |
| [imageProcessingQueue](../queues/imageProcessingQueue.md)                 |  `campaign.report_back.transactional` |
| [loggingQueue](../queues/loggingQueue.md)                                 |  `*.*.transactional`                  |
| [transactionalQueue](../queues/transactionalQueue.md)                     |  `*.*.transactional`                  |
| [userAPICampaignActivityQueue](../queues/userAPICampaignActivityQueue.md) |  `campaign.*.*`                       |

#### Current Message Payload

```js
{

  /* Required. Always must be "campaign_reportback". */
  activity: String,

  /* Required. */
  email: String,

  /* Required. Phoenix user id. */
  uid: Number,

  /* Required. Phoenix campaign id. Example: "1334". */
  event_id: Number,

  /* Required, Example: "US". */
  user_country: String,

  /* Required. Example: "US".  */
  campaign_country: String,

  /* Required. An array of string to tag the message with. Example: ["drupal_campaign_reportback"]. */
  email_tags: Array,

  /* Required. Unix timestamp. Example: "1458067430". */
  activity_timestamp: Number,

  /* Required. Example: "US". */
  application_id: String,

  /* Optional. Campaign langauge code. Example: "en". */
  campaign_language: String,

  /* Optional. Default is generated base on "user_country" field. Example: "mb-campaign-reportback-US". */
  email_template: String,

  /* Required. An array of variables to inject into Mandrill template. */
  /* Required keys: "MEMBER_COUNT", "FNAME", "CAMPAIGN_TITLE", "IMPACT_VERB", */
  /* "IMPACT_NUMBER", "IMPACT_NOUN", "REPORTBACK_IMAGE_MARKUP". */
  merge_vars: Array,

}
```

----

#### Suggested API

**Endpoint**

`POST /campaign/reportback`

**Body Parameters**

```js
{

  /* Required: user_id or email or mobile. Northstar user ID. Example: "555b9225bffebc31068b4567". */
  user_id: String,

  /* Required: user_id or email or mobile. */
  email: String,

  /* Required: user_id or email or mobile. */
  mobile: String,

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

- :x: `activity`: always `campaign_reportback` for this message type
- :x: `merge_var: MEMBER_COUNT` retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `merge_var: CAMPAIGN_TITLE` value from Phoenix
- :x: `merge_var: CAMPAIGN_LINK` value from Phoenix
- :x: `merge_var: IMPACT_VERB` value from Phoenix
- :x: `merge_var: IMPACT_NUMBER` value from Phoenix
- :x: `merge_var: IMPACT_NOUN` value from Phoenix
- :x: `merge_var: REPORTBACK_IMAGE_MARKUP` value from Phoenix
- :x: `merge_var: FNAME` value from Northstar
- :x: `activity_timestamp` set in Quicksilver API
- :x: `user_country` value from Northstar
- :heavy_exclamation_mark: `event_id` renamed to `campaign_id`
- :heavy_exclamation_mark: `email_tag` will be determined from `application_id`
- :heavy_exclamation_mark: `application_id` new optional field to determine client app
- :heavy_exclamation_mark: `email_template` should be determined from `user_country` but can be defined to use specific template.
- :heavy_exclamation_mark: `user_id` Phoenix user id is replaced with [Northstar](https://github.com/DoSomething/northstar/blob/dev/documentation/endpoints/users.md#retrieve-a-user) user id.
