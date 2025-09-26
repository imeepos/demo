import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

/**
 * 获取加密密钥
 * 从环境变量获取，如果不存在则使用默认开发密钥
 */
function getEncryptionKey(): string {
  return process.env.CONFIG_ENCRYPTION_KEY || 'default-dev-key-32-chars-long!!';
}

/**
 * 加密函数
 * 使用 AES-256-GCM 算法加密敏感配置
 */
function encrypt(text: string): string {
  try {
    const key = Buffer.from(getEncryptionKey().slice(0, 32), 'utf8');
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  } catch (error) {
    throw new Error(
      '配置加密失败: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * 解密函数
 * 解密使用 AES-256-GCM 加密的配置值
 */
function decrypt(encryptedText: string): string {
  try {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('加密数据格式不正确');
    }

    const key = Buffer.from(getEncryptionKey().slice(0, 32), 'utf8');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error(
      '配置解密失败: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * 系统配置实体
 * 用于存储系统配置信息，支持敏感信息的加密存储
 * 如 OpenAI API 配置、数据库连接信息等
 */
@Entity('configs')
@Index(['key'], { unique: true }) // 唯一索引：确保配置键唯一
@Index(['category', 'isActive']) // 复合索引：支持按分类和状态查询
@Index(['isActive']) // 单列索引：支持按状态查询
export class Config {
  @PrimaryGeneratedColumn({ comment: '配置项唯一标识' })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '配置键名，如 openai.baseUrl, openai.apiKey',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  key: string;

  @Column({
    type: 'text',
    comment: '配置值，敏感信息将加密存储',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '配置项描述说明',
  })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description?: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '是否为加密存储的敏感信息',
  })
  @IsBoolean()
  isEncrypted: boolean;

  @Column({
    type: 'boolean',
    default: true,
    comment: '配置是否启用',
  })
  @IsBoolean()
  isActive: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'system',
    comment: '配置分类，如 openai, database, system',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  category: string;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  /**
   * 获取解密后的配置值
   * 如果是加密存储则解密返回，否则直接返回原值
   */
  getDecryptedValue(): string {
    if (!this.isEncrypted) {
      return this.value;
    }
    return decrypt(this.value);
  }

  /**
   * 设置配置值
   * 如果标记为加密存储，则自动加密后存储
   * @param plainValue 明文配置值
   */
  setEncryptedValue(plainValue: string): void {
    this.value = this.isEncrypted ? encrypt(plainValue) : plainValue;
  }

  /**
   * 检查是否为 OpenAI 相关配置
   */
  isOpenAIConfig(): boolean {
    return this.category === 'openai' || this.key.startsWith('openai.');
  }

  /**
   * 检查是否为敏感配置项
   * API密钥、密码等敏感信息
   */
  isSensitive(): boolean {
    const sensitiveKeys = ['apiKey', 'password', 'secret', 'token'];
    return sensitiveKeys.some(keyword =>
      this.key.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * 获取配置值的安全显示
   * 敏感信息显示为掩码
   */
  getDisplayValue(): string {
    if (this.isSensitive() && this.value) {
      const plainValue = this.getDecryptedValue();
      if (plainValue.length <= 8) {
        return '***';
      }
      return (
        plainValue.substring(0, 4) +
        '***' +
        plainValue.substring(plainValue.length - 4)
      );
    }
    return this.getDecryptedValue();
  }
}
