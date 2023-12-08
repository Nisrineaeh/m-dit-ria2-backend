import { Comment } from "src/comment/entities/comment.entity";
import { Forum } from "src/forum/entities/forum.entity";
import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { Message } from "src/message/entities/message.entity";
import { Média } from "src/média/entities/média.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Média, media => media.user, { onDelete: 'CASCADE' })
    media: Média[];

    @ManyToMany(() => MeditationTechnique )
    @JoinTable({
    name: 'favorite',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'meditation_technique_id',
      referencedColumnName: 'id',
    },
    })
    favorites: MeditationTechnique[];
    
}
