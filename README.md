# Quicksilver-API
API gateway to Quicksilver (Message Broker) functionality.

## Exchanges
### transactionalExchange
Triggered by transactional events, message are distributed to various services to respond to the event.

---

<dl>
  <dt>Type</dt>
  <dd><code>topic</code></dd>

  <dt>Description</dt>
  <dd>Transactional events</dd>

  <dt>Message Types</dt>
  <dd>
    <ul>
      <li><code>user_register</code></li>
      <li><code>user_password_reset</code></li>
      <li><code>campaign_signup</code></li>
      <li><code>campaign_reportback</code></li>
    </ul>
  </dd>
</dl>

#### Producers
---
##### <a href="http://www.dosomething.org">Phoenix</a> Message Types
<dl>
  <dt>User Registration</dt>
  <dd>Routing key: <code>user.registration.transactional</code></dd>

  <dt>User Password Reset</dt>
  <dd>Routing key: <code>user.password_reset.transactional</code></dd>

  <dt>Campaign Signup</dt>
  <dd>Routing key: <code>campaign.signup.transactional</code></dd>

  <dt>Campaign Reportback</dt>
  <dd>Routing key: <code>campaign.report_back.transactional</code></dd>
</dl>

#### Queues
---
##### `transactionalQueue`
<dl>
  <dt>Binding key</dt>
  <dd><code>*.*.transactional</code></dd>

  <dt>Consumers: transactional email</dt>
  <dd>
    <ul>
      <li><a href="/DoSomething/mbc-transactional-email">mbc-transactional-email</a></li>
      <li>Send templated email messages with transaction specific content using the <a href="https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template">Mandrill API <code>send-template</code></a> endpoint.</li>
    </ul>
  </dd>
</dl>

##### `imageProcessingQueue`
<dl>
  <dt>Binding key</dt>
  <dd><code>campaign.report_back.transactional</code></dd>

  <dt>Consumer: Campaign reportback image processor</dt>
  <dd>
    <ul>
      <li><a href="/DoSomething/Quicksilver-PHP/mbc-image-processor">mbc-image-processor</a></li>
      <li>Images submitted with campaign reportbacks are processed: cropped and scaled based on image styles defined in Phoenix. Processing image submissions transactionally ensures access to the image will be a cached version.</li>
    </ul>
  </dd>
</dl>
