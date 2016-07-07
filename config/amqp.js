/**
 * RabbitMQ configuration.
 */
module.exports.amqp = {
  management: {
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    hostname: process.env.RABBITMQ_MANAGEMENT_HOST,
    protocol: process.env.RABBITMQ_SSL ? 'https' : 'http',
    vhost: process.env.RABBITMQ_VHOST,
  },
  connection: {
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    ssl: process.env.RABBITMQ_SSL,
    host: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    vhost: process.env.RABBITMQ_VHOST,
  }
};
