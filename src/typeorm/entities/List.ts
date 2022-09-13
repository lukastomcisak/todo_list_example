import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './Items';
import { User } from './User';

@Entity({ name: 'lists' })
export class List {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  createdBy: string;

  @ManyToMany(() => User, (user) => user.lists)
  users: User[]

  @OneToMany(() => Items, (item) => item.list)
    items: Items[]
}
