import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zookeeper } from "./Zookeeper";

@Entity("animal", { schema: "zoo" })
export class Animal {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "systematics", length: 255 })
  systematics: string;

  @Column("int", { name: "count" })
  count: number;

  @ManyToOne(() => Zookeeper, (zookeeper) => zookeeper.animals, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "zookeeper_id", referencedColumnName: "id" }])
  zookeeper: Zookeeper;
}
