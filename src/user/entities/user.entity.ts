import { Comment } from "src/comment/entities/comment.entity";
import { Favorite } from "src/favorite/entities/favorite.entity";
import { Forum } from "src/forum/entities/forum.entity";
import { Message } from "src/message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @OneToMany(() => Message, (message) => message.sender, { cascade: true })
    messageSent: Message[];

    @OneToMany(() => Message, (message) => message.receiver, { cascade: true })
    messageReceived: Message[];

    @OneToMany(() => Forum, forum => forum.user)
    forums: Forum[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
