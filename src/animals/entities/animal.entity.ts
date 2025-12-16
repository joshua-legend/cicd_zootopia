import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';
import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// 하나의 조련사는 여러 동물을 관리한다. (1:N)
// 하나의 동물은 하나의 조련사에 의해 관리된다.

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  systematics: string;

  @Column()
  count: number;

  @Column({ name: 'zookeeper_id' })
  zookeeper_id: number;

  @ManyToOne(() => Zookeeper, (z) => z.animals, { nullable: false })
  @JoinColumn({ name: 'zookeeper_id' })
  zookeeper: Zookeeper;
}
