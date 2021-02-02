import { IsEmail, Length } from "class-validator";
import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import AbstractEntity from "./AbstractEntity";
import User from "./User";
import { makeId, slugify } from "../utils/helpers";
import Sub from "./Sub";

@Entity("posts")
export default class Post extends AbstractEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 character id

  @Index()
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @BeforeInsert()
  makeIdandSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
