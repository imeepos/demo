import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsString, IsNumber, IsNotEmpty, Min, Max, Length } from 'class-validator';

@Entity('sentiment_intensities')
export class SentimentIntensity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '情感标题' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, comment: '情感强度值 (0.00-1.00)' })
  @IsNumber()
  @Min(0)
  @Max(1)
  intensity: number;

  @Column({ type: 'text', nullable: true, comment: '情感简介描述' })
  @IsString()
  description?: string;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;
}