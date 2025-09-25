import { Transport, RmqOptions } from '@nestjs/microservices';

export const getRabbitMQConfig = () => {
  const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
  const rabbitMQPort = parseInt(process.env.RABBITMQ_PORT || '5672', 10);
  const rabbitMQUser = process.env.RABBITMQ_USER || 'sker_admin';
  const rabbitMQPassword = process.env.RABBITMQ_PASSWORD || 'sker_rabbitmq_password';
  const rabbitMQVhost = process.env.RABBITMQ_VHOST || 'sker_vhost';

  const connectionUrl = `amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}/${rabbitMQVhost}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [connectionUrl],
      queue: 'data_cleaner_queue',
      queueOptions: {
        durable: true,
        arguments: {
          'x-message-ttl': 300000,
          'x-max-retries': 3,
        },
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
      prefetchCount: 10,
      isGlobalPrefetchCount: false,
      noAck: false,
    },
  } as RmqOptions;
};
