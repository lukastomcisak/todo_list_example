import { STATUS } from 'src/utils/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List';

@Entity({ name: 'items' })
export class Items {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  deadline: Date;

  @Column()
  createdBy: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @ManyToOne(() => List, (list) => list.items)
  list: List;
}
