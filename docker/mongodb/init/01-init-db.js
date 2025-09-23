/* eslint-disable no-undef, no-useless-escape */
// MongoDB 数据库初始化脚本

// 切换到应用数据库
db = db.getSiblingDB('sker_mongo_db');

// 创建用户集合
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'createdAt'],
      properties: {
        username: {
          bsonType: 'string',
          description: '用户名必须是字符串且为必填项',
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
          description: '邮箱必须是有效的邮箱地址',
        },
        profile: {
          bsonType: 'object',
          properties: {
            firstName: { bsonType: 'string' },
            lastName: { bsonType: 'string' },
            avatar: { bsonType: 'string' },
            bio: { bsonType: 'string' },
            website: { bsonType: 'string' },
          },
        },
        preferences: {
          bsonType: 'object',
          properties: {
            theme: { enum: ['light', 'dark', 'auto'] },
            language: { bsonType: 'string' },
            notifications: { bsonType: 'bool' },
          },
        },
        isActive: {
          bsonType: 'bool',
          description: '用户激活状态',
        },
        createdAt: {
          bsonType: 'date',
          description: '创建时间',
        },
        updatedAt: {
          bsonType: 'date',
          description: '更新时间',
        },
      },
    },
  },
});

// 创建日志集合
db.createCollection('logs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['level', 'message', 'timestamp'],
      properties: {
        level: {
          enum: ['error', 'warn', 'info', 'debug'],
          description: '日志级别',
        },
        message: {
          bsonType: 'string',
          description: '日志消息',
        },
        metadata: {
          bsonType: 'object',
          description: '附加元数据',
        },
        userId: {
          bsonType: 'objectId',
          description: '用户ID',
        },
        timestamp: {
          bsonType: 'date',
          description: '时间戳',
        },
      },
    },
  },
});

// 创建配置集合
db.createCollection('configurations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['key', 'value', 'updatedAt'],
      properties: {
        key: {
          bsonType: 'string',
          description: '配置键',
        },
        value: {
          description: '配置值，可以是任意类型',
        },
        description: {
          bsonType: 'string',
          description: '配置描述',
        },
        isPublic: {
          bsonType: 'bool',
          description: '是否为公开配置',
        },
        updatedAt: {
          bsonType: 'date',
          description: '更新时间',
        },
      },
    },
  },
});

// 创建缓存集合（TTL）
db.createCollection('cache', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['key', 'value', 'createdAt'],
      properties: {
        key: {
          bsonType: 'string',
          description: '缓存键',
        },
        value: {
          description: '缓存值',
        },
        ttl: {
          bsonType: 'int',
          description: 'TTL（秒）',
        },
        createdAt: {
          bsonType: 'date',
          description: '创建时间',
        },
      },
    },
  },
});

// 创建索引
// 用户集合索引
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ isActive: 1 });
db.users.createIndex({ createdAt: -1 });
db.users.createIndex({ 'profile.firstName': 1, 'profile.lastName': 1 });

// 日志集合索引
db.logs.createIndex({ timestamp: -1 });
db.logs.createIndex({ level: 1 });
db.logs.createIndex({ userId: 1 });
db.logs.createIndex({ timestamp: -1, level: 1 });

// 配置集合索引
db.configurations.createIndex({ key: 1 }, { unique: true });
db.configurations.createIndex({ isPublic: 1 });

// 缓存集合索引和TTL
db.cache.createIndex({ key: 1 }, { unique: true });
db.cache.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // 1小时TTL

// 插入默认配置
db.configurations.insertMany([
  {
    key: 'app.name',
    value: 'Sker Application',
    description: '应用程序名称',
    isPublic: true,
    updatedAt: new Date(),
  },
  {
    key: 'app.version',
    value: '1.0.0',
    description: '应用程序版本',
    isPublic: true,
    updatedAt: new Date(),
  },
  {
    key: 'features.registration',
    value: true,
    description: '是否允许用户注册',
    isPublic: false,
    updatedAt: new Date(),
  },
  {
    key: 'security.passwordMinLength',
    value: 8,
    description: '密码最小长度',
    isPublic: false,
    updatedAt: new Date(),
  },
  {
    key: 'ui.theme.default',
    value: 'light',
    description: '默认主题',
    isPublic: true,
    updatedAt: new Date(),
  },
]);

// 创建应用用户（非root用户）
db.createUser({
  user: 'sker_app_user',
  pwd: 'sker_app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'sker_mongo_db',
    },
  ],
});

print('MongoDB 数据库初始化完成！');
print('- 创建了 users, logs, configurations, cache 集合');
print('- 设置了相应的验证规则和索引');
print('- 插入了默认配置数据');
print('- 创建了应用用户 sker_app_user');
