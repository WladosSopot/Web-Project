import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  text: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
