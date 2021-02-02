import { IsEmail, Length } from "class-validator";
import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import AbstractEntity from "./AbstractEntity";
import User from "./User";
import { makeId, slugify } from "../utils/helpers";
import Post from "./Post";

@Entity("subs")
export default class Sub extends AbstractEntity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];
}
