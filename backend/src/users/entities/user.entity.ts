import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: true, nullable: false, select: false })
  isActive: boolean;
}
