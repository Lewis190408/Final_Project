import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  studentId: string;

  @Column
  password: string;

  @Column
  gender: string;

  @Column({ defaultValue: 'student' })
  role: string;
}
