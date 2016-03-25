# userAPICampaignActivityQueue

##### Purpose
Messages related to user campaign signup and report back transactions that are consumed to send requests to `mb-user-api` `/user` to maintain a user document in `mb-user` of campaign activity.

##### Consumer
Campaign signup consumer: [mbc-userAPI-campaignActivity](https://github.com/DoSomething/mbc-userAPI-campaignActivity).

##### Exchange
`transactionalExchange`

##### Binding Kyes
- `campaign.*.*`
