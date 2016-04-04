# Campaign Endpoints

## Campaign signup

**Endpoint**

```
POST /campaign/signup
```

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

  /* Required. The language of the campaign the user subscribed to. Example: "en". */
  campaign_language: String,

  /* Optional. The default is generated base on "user_country" value gathered */
  /* from user settings found for "email" or "user_id". */
  /* Example: "mb-campaign-signup-US". Defining this value allows */
  /* for specification of an alternative template. */
  email_template: String,

}
```

**Example Request**

TODO

**Corresponding message**

[campaign.signup.transactional](../messages/campaign.signup.transactional.md)

**Changelog**

- :x: `activity`: always `campaign_signup` for this message type
- :x: `merge_var: MEMBER_COUNT` retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `merge_var: CAMPAIGN_TITLE` value from Phoenix
- :x: `merge_var: CAMPAIGN_LINK` value from Phoenix
- :x: `merge_var: CALL_TO_ACTION` value from Phoenix
- :x: `merge_var: STEP_ONE` value from Phoenix
- :x: `merge_var: STEP_TWO` value from Phoenix
- :x: `merge_var: STEP_THREE` value from Phoenix
- :x: `merge_var: CAMPAIGN_COPY` value from Phoenix
- :x: `merge_var: FNAME` value from Northstar
- :x: `mailchimp_list_id` value from Phoenix
- :x: `mailchimp_grouping_id` value from Phoenix
- :x: `mailchimp_group_name` value from Phoenix
- :x: `mc_opt_in_path_id` value from Phoenix
- :x: `activity_timestamp` set in Quicksilver API
- :x: `user_language` value from Northstar
- :x: `user_country` value from Northstar
- :x: `subscribed` removed, always `1` as transaction request enables user email subscription preference.
- :heavy_exclamation_mark: `event_id` renamed to `campaign_id`
- :heavy_exclamation_mark: `email_tag` will be determined from `application_id`
- :heavy_exclamation_mark: `application_id` new optional field to determine client app
- :heavy_exclamation_mark: `email_template` should be determined from `user_country` but can be defined to use specific template.
- :heavy_exclamation_mark: `user_id` Phoenix user id is replaced with [Northstar](https://github.com/DoSomething/northstar/blob/dev/documentation/endpoints/users.md#retrieve-a-user) user id.


## Campaign report back


**Endpoint**

```
POST /campaign/reportback
```

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

  /* Optional. The default is generated base on "user_country" value gathered */
  /* from user settings found for "email" or "user_id". */
  /* Example: "mb-campaign-reportback-US". Defining this value allows */
  /* for specification of an alternative template. */
  email_template: String,

}
```

**Example Request**

TODO


**Corresponding message**

[campaign.report_back.transactional](../messages/campaign.report_back.transactional.md)

**Changelog**

- :x: `activity`: always `campaign_reportback` for this message type
- :x: `merge_var: MEMBER_COUNT` retrieved from Phoenix: see [API](https://github.com/DoSomething/phoenix/wiki/API#get-member-count)
- :x: `merge_var: CAMPAIGN_TITLE` value from Phoenix
- :x: `merge_var: CAMPAIGN_LINK` value from Phoenix
- :x: `merge_var: IMPACT_VERB` value from Phoenix
- :x: `merge_var: IMPACT_NUMBER` value from Phoenix
- :x: `merge_var: IMPACT_NOUN` value from Phoenix
- :x: `merge_var: REPORTBACK_IMAGE_MARKUP` value from Phoenix
- :x: `campaign_language` value from Phoenix, based on campaign signup of the same campaign ID.
- :x: `merge_var: FNAME` value from Northstar
- :x: `activity_timestamp` set in Quicksilver API
- :x: `user_country` value from Northstar
- :heavy_exclamation_mark: `event_id` renamed to `campaign_id`
- :heavy_exclamation_mark: `email_tag` will be determined from `application_id`
- :heavy_exclamation_mark: `application_id` new optional field to determine client app
- :heavy_exclamation_mark: `email_template` should be determined from `user_country` but can be defined to use specific template.
- :heavy_exclamation_mark: `user_id` Phoenix user id is replaced with [Northstar](https://github.com/DoSomething/northstar/blob/dev/documentation/endpoints/users.md#retrieve-a-user) user id.
