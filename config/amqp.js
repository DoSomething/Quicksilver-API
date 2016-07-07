/**
 * RabbitMQ configuration.
 */
module.exports.amqp = {
  management: {
    username: process.env.QS_RABBITMQ_USERNAME,
    password: process.env.QS_RABBITMQ_PASSWORD,
    hostname: process.env.QS_RABBITMQ_MANAGEMENT_HOST,
    protocol: process.env.QS_RABBITMQ_SSL === 'true' ? 'https' : 'http',
    vhost: process.env.QS_RABBITMQ_VHOST,
  },
  connection: {
    username: process.env.QS_RABBITMQ_USERNAME,
    password: process.env.QS_RABBITMQ_PASSWORD,
    ssl: process.env.QS_RABBITMQ_SSL === 'true',
    host: process.env.QS_RABBITMQ_HOST,
    port: process.env.QS_RABBITMQ_PORT,
    vhost: process.env.QS_RABBITMQ_VHOST,
  }
};
