import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
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
 * 媒体类型实体
 * 用于分类舆情事件的媒体来源，支持政府部门、自媒体、企业等不同类别
 */
@Entity('media_types')
@Index(['isActive', 'sortOrder']) // 复合索引：支持按启用状态和排序查询
@Index(['parentId']) // 父级分类索引：支持层级查询
export class MediaType {
  @PrimaryGeneratedColumn({ comment: '媒体类型唯一标识' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '媒体类型代码，如 government, self_media',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '媒体类型名称，如 政府部门, 自媒体',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '媒体类型详细描述',
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
    type: 'tinyint',
    default: 5,
    comment: '可信度等级 1-10，数值越高可信度越高',
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  credibilityLevel: number;

  @Column({
    type: 'boolean',
    default: true,
    comment: '是否启用该媒体类型',
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
