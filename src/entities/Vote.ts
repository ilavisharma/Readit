import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import AbstractEntity from "./AbstractEntity";
import Post from "./Post";
import User from "./User";
import Comment from "./Comment";

@Entity("votes")
export default class Vote extends AbstractEntity {
  constructor(vote: Partial<Vote>) {
    super();
    Object.assign(this, vote);
  }

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
