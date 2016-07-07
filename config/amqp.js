/**
 * RabbitMQ configuration.
 */
module.exports.amqp = {
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  hostname: process.env.RABBITMQ_HOSTNAME,
  protocol: process.env.RABBITMQ_PROTOCOL,
  vhost: process.env.RABBITMQ_VHOST,
};
