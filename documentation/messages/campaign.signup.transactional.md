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

  /* Required. Must be "campaign_signup" or "campaign_group_signup". */
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

  /*
    Optional. Default is generated base on "user_country" field.
    Example: "mb-campaign-signup-US", "mb-campaign-group-signup-US"
  */
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

  /* Optional. Override Mailchimp list id.  */
  mailchimp_list_id: String,

  /* Optional. Override Mailchimp Grouping id. */
  mailchimp_grouping_id: Number,

  /* Optional. Override Mailchimp Interest Group Name. */
  mailchimp_group_name: String,

  /* Optional. */
  mobile: String,

  /* Optional. Override Mobilecommons opt-in path. */
  mc_opt_in_path_id: Number,

  /*
    Required. An array of variables to inject into Mandrill template.
    Required keys: "MEMBER_COUNT", "FNAME", "CAMPAIGN_TITLE", "CAMPAIGN_LINK".

    For single campaigns required:
    "CALL_TO_ACTION", "STEP_ONE", "STEP_TWO", "STEP_THREE".

    For campaign groups required: "CAMPAIGN_COPY".
  */
  merge_vars: Array,

}
```
