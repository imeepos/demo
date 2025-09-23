# 数据库环境配置指南

本项目使用 Docker Compose 管理多个数据库服务，包括 PostgreSQL、Redis、RabbitMQ 和 MongoDB。

## 🚀 快速开始

### 1. 环境准备

确保已安装以下工具：

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. 环境配置

复制环境变量模板文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，修改默认密码和配置：

```bash
# 建议修改所有包含 'change_me' 的密码
POSTGRES_PASSWORD=your_secure_password
REDIS_PASSWORD=your_redis_password
RABBITMQ_PASSWORD=your_rabbitmq_password
MONGO_ROOT_PASSWORD=your_mongo_password
```

### 3. 启动数据库服务

```bash
# 启动所有数据库服务
docker-compose up -d

# 仅启动特定服务
docker-compose up -d postgres redis
```

### 4. 验证服务状态

```bash
# 检查服务状态
docker-compose ps

# 查看服务日志
docker-compose logs postgres
docker-compose logs redis
docker-compose logs rabbitmq
docker-compose logs mongodb
```

## 📊 数据库服务详情

### PostgreSQL

- **端口**: 5432
- **数据库**: sker_db
- **用户**: sker_user
- **管理界面**: pgAdmin (http://localhost:8080)
- **连接字符串**: `postgresql://sker_user:password@localhost:5432/sker_db`

**预设表结构**:

- `users` - 用户信息
- `roles` - 角色管理
- `user_roles` - 用户角色关联
- `user_sessions` - 用户会话
- `audit_logs` - 审计日志
- `app_settings` - 应用配置

### Redis

- **端口**: 6379
- **密码**: 在环境变量中配置
- **连接字符串**: `redis://:password@localhost:6379`
- **配置**: 内存限制 512MB，LRU 淘汰策略

**用途**:

- 会话存储
- 缓存数据
- 队列处理

### RabbitMQ

- **端口**: 5672 (AMQP), 15672 (Management)
- **虚拟主机**: sker_vhost
- **管理界面**: http://localhost:15672
- **连接字符串**: `amqp://user:password@localhost:5672/sker_vhost`

**启用插件**:

- rabbitmq_management
- rabbitmq_prometheus
- rabbitmq_shovel

### MongoDB

- **端口**: 27017
- **数据库**: sker_mongo_db
- **管理界面**: Mongo Express (http://localhost:8081)
- **连接字符串**: `mongodb://admin:password@localhost:27017/sker_mongo_db?authSource=admin`

**预设集合**:

- `users` - 用户配置文件
- `logs` - 应用日志
- `configurations` - 动态配置
- `cache` - 临时缓存（带TTL）

## 🛠️ 管理命令

### 服务管理

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启特定服务
docker-compose restart postgres

# 查看服务日志
docker-compose logs -f redis

# 进入服务容器
docker-compose exec postgres psql -U sker_user -d sker_db
docker-compose exec redis redis-cli
docker-compose exec mongodb mongosh
```

### 数据管理

```bash
# 备份 PostgreSQL
docker-compose exec postgres pg_dump -U sker_user sker_db > backup.sql

# 恢复 PostgreSQL
docker-compose exec -T postgres psql -U sker_user -d sker_db < backup.sql

# 备份 MongoDB
docker-compose exec mongodb mongodump --db sker_mongo_db --out /data/backup

# Redis 内存使用情况
docker-compose exec redis redis-cli info memory
```

### 数据卷管理

```bash
# 查看数据卷
docker volume ls

# 清理未使用的数据卷（谨慎使用）
docker volume prune

# 备份数据卷
docker run --rm -v demos_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

## 🔧 开发配置

### 应用程序连接示例

#### Node.js / JavaScript

```javascript
// PostgreSQL (使用 pg 或 Prisma)
const postgres = {
  host: 'localhost',
  port: 5432,
  database: 'sker_db',
  username: 'sker_user',
  password: process.env.POSTGRES_PASSWORD,
};

// Redis (使用 ioredis)
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

// MongoDB (使用 mongoose)
const mongoUrl = process.env.MONGODB_URL;

// RabbitMQ (使用 amqplib)
const rabbitmq = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: process.env.RABBITMQ_USER,
  password: process.env.RABBITMQ_PASSWORD,
  vhost: process.env.RABBITMQ_VHOST,
};
```

#### Python

```python
# PostgreSQL (使用 psycopg2 或 SQLAlchemy)
DATABASE_URL = "postgresql://sker_user:password@localhost:5432/sker_db"

# Redis (使用 redis-py)
import redis
r = redis.Redis(host='localhost', port=6379, password='password')

# MongoDB (使用 pymongo)
from pymongo import MongoClient
client = MongoClient('mongodb://admin:password@localhost:27017/')
```

## 🔍 监控和调试

### 健康检查

所有服务都配置了健康检查，可以通过以下方式查看：

```bash
docker-compose ps
```

### 日志分析

```bash
# 查看错误日志
docker-compose logs --tail=100 postgres | grep ERROR

# 实时监控日志
docker-compose logs -f redis
```

### 性能监控

```bash
# PostgreSQL 连接数
docker-compose exec postgres psql -U sker_user -d sker_db -c "SELECT count(*) FROM pg_stat_activity;"

# Redis 内存使用
docker-compose exec redis redis-cli info memory | grep used_memory_human

# MongoDB 状态
docker-compose exec mongodb mongosh --eval "db.serverStatus()"
```

## 🛡️ 安全建议

### 生产环境配置

1. **修改默认密码**: 确保所有服务使用强密码
2. **网络隔离**: 配置防火墙规则，只允许必要的端口访问
3. **SSL/TLS**: 为生产环境启用加密连接
4. **备份策略**: 定期备份重要数据
5. **监控告警**: 设置服务监控和告警机制

### 开发环境注意事项

1. **不要在版本控制中提交 .env 文件**
2. **定期更新 Docker 镜像**
3. **监控容器资源使用情况**
4. **及时清理测试数据**

## 🚨 故障排除

### 常见问题

#### 端口冲突

```bash
# 检查端口占用
netstat -tulpn | grep :5432

# 修改 docker-compose.yaml 中的端口映射
ports:
  - "5433:5432"  # 将本地端口改为 5433
```

#### 数据卷权限问题

```bash
# 修复权限
sudo chown -R 999:999 /var/lib/docker/volumes/demos_postgres_data/_data
```

#### 服务启动失败

```bash
# 查看详细日志
docker-compose logs service_name

# 重新构建并启动
docker-compose down
docker-compose up -d --force-recreate
```

#### 数据库连接失败

1. 检查服务是否正常运行
2. 验证环境变量配置
3. 确认网络连通性
4. 检查防火墙设置

## 📚 参考资源

- [Docker Compose 官方文档](https://docs.docker.com/compose/)
- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [Redis 官方文档](https://redis.io/documentation)
- [RabbitMQ 官方文档](https://www.rabbitmq.com/documentation.html)
- [MongoDB 官方文档](https://docs.mongodb.com/)

---

_最后更新：2025年9月_
