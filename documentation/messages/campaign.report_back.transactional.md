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
