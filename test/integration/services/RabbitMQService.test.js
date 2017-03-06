'use strict';

const AMQPStats = require('amqp-stats');
const should = require('should');
const Channel = require('amqplib/lib/channel').Channel;

/**
 * RabbitMQ connection.
 */
describe('RabbitMQ', () => {
  /**
   * Helper: get Rabbit management client.
   */
  function getManagementClient() {
    return new AMQPStats({
      username: sails.config.amqp.management.username,
      password: sails.config.amqp.management.password,
      hostname: sails.config.amqp.management.hostname,
      protocol: sails.config.amqp.management.protocol,
    });
  }

  /**
   *  Check configuration.
   */
  before(() => {
    // Sails should be configured.
    should(sails.config).have.property('amqp');

    // Rabbit Management.
    should(sails.config.amqp).have.property('management');
    sails.config.amqp.management.should.have.properties([
      'username',
      'password',
      'hostname',
      'protocol',
      'vhost',
    ]);

    // AMQP connection settings.
    should(sails.config.amqp).have.property('connection');
    sails.config.amqp.connection.should.have.properties([
      'user',
      'password',
      'ssl',
      'host',
      'port',
      'vhost',
    ]);
  });

  /**
   * Check conntction to management plugin.
   */
  it('Management plugin should be enabled', (done) => {
    const client = getManagementClient();
    client.overview((err, res, data) => {
      if (err) { throw err; }
      data.should.have.property('management_version');
      done();
    });
  });

  // Default vhost.
  describe('default vhost', () => {
    /**
     * Vhost should exist.
     */
    it('should exist', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.management.vhost;
      client.getVHost(vhostName, (err, res, data) => {
        if (err) { throw err; }
        data.should.have.property('name').which.is.equal(vhostName);
        done();
      });
    });

    /**
     * Declares a test queue, then publishes and consumes a message.
     */
    it('should pass the aliveness test', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.management.vhost;
      client.alive(vhostName, (err, res, data) => {
        if (err) { throw err; }
        data.should.have.property('status').which.is.equal('ok');
        done();
      });
    });
  });

  describe('AMQP client', () => {
    it('should be able to connect', () => {
      const result = RabbitMQService.getChannel()
        .should.eventually.be.an.instanceof(Channel);
      return result;
    });

    it('should be able to publish messages', () => {
      const msg = {
        test: true,
      };
      const result = RabbitMQService.publishUserPasswordResetTransactional(msg);
      return result.should.eventually.be.equal(true);
    });

    /**
     * Test transactionalExchange presence.
     * TODO: run rabbit.setup();
     */
    it('transactionalExchange should appear on default vhost', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.management.vhost;
      const exchangeName = 'transactionalExchange';
      client.getExchange(vhostName, exchangeName, (err, res, data) => {
        if (err) { throw err; }
        // TODO: test properties.
        if (!data) { throw new Error('No data'); }
        done();
      });
    });

    /**
     * Test transactionalQueue presence.
     * TODO: run rabbit.setup();
     */
    it('transactionalQueue should appear on default vhost', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.management.vhost;
      const queueName = 'transactionalQueue';
      client.getQueue(vhostName, queueName, (err, res, data) => {
        if (err) { throw err; }
        // TODO: test properties.
        if (!data) { throw new Error('No data'); }
        done();
      });
    });
  });
});
