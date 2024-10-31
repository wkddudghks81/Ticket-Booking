import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';
import { MAX_PRICE } from 'src/constants/point.constant';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty({ message: '공연명을 입력해 주세요.' })
  @IsString()
  @Column({ unique: true })
  title: string;

  @IsNotEmpty({ message: '공연 설명을 입력해 주세요.' })
  @IsString()
  @Column({ type: 'text' })
  description: string;

  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @IsEnum(ShowCategory)
  @Column({ type: 'enum', enum: ShowCategory })
  category: ShowCategory;

  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @IsString()
  @Column()
  place: string;

  @IsNotEmpty({ message: '가격을 입력해 주세요.' })
  @IsNumber()
  @Max(MAX_PRICE, { message: '공연 가격은 50,000 포인트를 넘을 수 없습니다.' })
  @Column()
  price: number;

  @IsNotEmpty({ message: '썸네일을 입력해 주세요.' })
  @IsString()
  @Column()
  thumbnail: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.show, { cascade: true })
  schedules: Schedule[];
}
