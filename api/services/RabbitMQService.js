'use strict';

const amqplib = require('amqplib');
const amqpUri = require('amqp-uri');


/**
 * Nortstar client service.
 */
module.exports = {
  /**
   * Configure RabbitMQ client.
   */
  getClient() {
    if (!this.client) {
      this.client = amqplib.connect(amqpUri(sails.config.amqp.connection));
    }
    return this.client;
  },
  getChannel() {
    return this.getClient().then(conn => conn.createChannel());
  },
  publishUserPasswordResetTransactional(message) {
    const queueName = 'transactionalQueue';
    const exchangeName = 'transactionalExchange';
    const bindingPattern = '*.*.transactional';
    const routingKey = 'user.password_reset.transactional';
    const msgBuffer = new Buffer(JSON.stringify(message), 'utf-8');

    return new Promise((resolve, reject) => {
      this.bindQueueToExchange(queueName, exchangeName, bindingPattern)
        .then((channel) => {
          channel.publish(exchangeName, routingKey, msgBuffer);
          resolve(true);
        })
        .catch(error => reject(error));
    });
  },
  bindQueueToExchange(queueName, exchangeName, routingKey) {
    return new Promise((resolve, reject) => {
      this.getChannel()
        .then((channel) => {
          channel.assertExchange(exchangeName, 'topic').then(() => {
            channel.assertQueue(queueName).then(() => {
              channel.bindQueue(queueName, exchangeName, routingKey)
                .then(() => resolve(channel));
            });
          });
        })
        .catch(error => reject(error));
    });
  },
};
