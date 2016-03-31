# imageProcessingQueue

##### Purpose
Consumers of this queue gather image details from `campaign_reportback`
messages to trigger image processing functionality.

##### Consumer
Image processing consumer: [mbc-image-processor](https://github.com/DoSomething/Quicksilver-PHP/tree/master/mbc-image-processor).

##### Exchange
`transactionalExchange`

##### Binding Kyes
- `campaign.report_back.transactional`
