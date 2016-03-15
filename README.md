# Quicksilver-API
API gateway to Quicksilver (Message Broker) functionality.

## Exchanges
### transactionalQueue

---

<dl>
  <dt>Type</dt>
  <dd><code>topic</code></dd>

  <dt>Description</dt>
  <dd>Transactional email messages sent through Mandrill API.</dd>
</dl>

#### Queues
##### `transactionalQueue`
<dl>
  <dt>Routing key</dt>
  <dd><code>*.*.transactional</code></dd>

  <dt>Consumer: transactional email</dt>
  <dd><a href="/DoSomething/mbc-transactional-email">mbc-transactional-email</a></dd>
</dl>


#### Producers
##### Phoenix
<dl>
  <dt>user password reset</dt>
  <dd><code>user.password_reset.transactional</code></dd>

  <dt>campaign signup</dt>
  <dd><code>campaign.signup.transactional</code></dd>

  <dt>campaign reportback</dt>
  <dd><code>campaign.report_back.transactional</code></dd>
</dl>
