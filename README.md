# Quicksilver-API
API gateway to Quicksilver (Message Broker) functionality.

### Overview
| Producers                                                   | Exchange                      | Queue                                  | Consumers                                                                        | Description                                             |
| ----------------------------------------------------------: |:-----------------------------:|:--------------------------------------:| :------------------------------------------------------------------------------: | :-----------------------------------------------------: |
| Phoenix                                                     | transactionalExchange (topic) | transactionalQueue (*.*.transactional) | [mbc-transactional-email](https://github.com/DoSomething/mbc-transactional-email)| Transactional email messages sent through Mandrill API. |
| -> user password reset (user.password_reset.transactional)  |                               |                                        |                                                                                  |                                                         |
| -> campaign signup (campaign.signup.transactional)          |                               |                                        |                                                                                  |                                                         |
| -> campaign reportback (campaign.report_back.transactional) |                               |                                        |                                                                                  |                                                         |
