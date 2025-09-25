import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 事件类型实体
 * 用于分类舆情事件的类型，支持政治、经济、社会等不同类别
 */
@Entity('event_types')
@Index(['isActive', 'sortOrder']) // 复合索引：支持按启用状态和排序查询
export class EventType {
  @PrimaryGeneratedColumn({ comment: '事件类型唯一标识' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '事件类型代码，如 political, economic',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '事件类型名称，如 政治事件, 经济事件',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '事件类型详细描述',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: 'UI显示颜色代码，如 #ff6b6b',
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  color?: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: '是否启用该事件类型',
  })
  @IsBoolean()
  isActive: boolean;

  @Column({
    type: 'int',
    default: 0,
    comment: '排序权重，数值越大排序越靠前',
  })
  @IsNumber()
  @Min(0)
  sortOrder: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;
}
