import { Transport, RmqOptions } from '@nestjs/microservices';

export const getRabbitMQConfig = () => {
  const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
  const rabbitMQPort = parseInt(process.env.RABBITMQ_PORT || '5672', 10);
  const rabbitMQUser = process.env.RABBITMQ_USER || 'sker_admin';
  const rabbitMQPassword =
    process.env.RABBITMQ_PASSWORD || 'sker_rabbitmq_password';
  const rabbitMQVhost = process.env.RABBITMQ_VHOST || 'sker_vhost';

  const connectionUrl = `amqp://${rabbitMQUser}:${rabbitMQPassword}@${rabbitMQHost}:${rabbitMQPort}/${rabbitMQVhost}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [connectionUrl],
      queue: 'data_cleaner_queue',
      queueOptions: {
        durable: true, // 队列持久化
        arguments: {
          'x-message-ttl': 300000, // 5分钟消息TTL
          'x-max-retries': 3,
        },
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
      prefetchCount: 10, // 预取消息数量
      isGlobalPrefetchCount: false,
      noAck: false, // 需要手动确认消息
    },
  } as RmqOptions;
};
