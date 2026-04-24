import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: string;

  @Column()
  roomNumber: string;

  @Column()
  status: string; // 'Pending', 'Approved', or 'Denied'

  @CreateDateColumn()
  createdAt: Date;
}
