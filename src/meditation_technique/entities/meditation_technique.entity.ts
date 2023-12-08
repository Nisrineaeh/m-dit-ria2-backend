import { Comment } from "src/comment/entities/comment.entity";
import { Forum } from "src/forum/entities/forum.entity";
import { Média } from "src/média/entities/média.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'meditation_technique' })
export class MeditationTechnique {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    atmosphere: string;

    @Column()
    duration: number;

    @Column()
    keyword: string;

    @ManyToOne(() => User, (user) => user.id, { eager: true })
    @JoinColumn({ name: 'user_id' })
    createdBy: User;

    @OneToOne(() => Média, { onDelete: 'CASCADE', eager: true})
    @JoinColumn({ name: 'audio_media_id' })
    audioMedia: Média;

    @OneToOne(() => Média, { onDelete: 'CASCADE', eager: true  })
    @JoinColumn({ name: 'visual_media_id' })
    visualMedia: Média;


    @OneToMany(() => Forum, (forum) => forum.meditation_technique, { cascade: true })
    forums: Forum[];


    @OneToMany(() => Comment, (comment) => comment.meditationTechnique)
    comments: Comment[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'favorite',
        joinColumn: {
            name: 'meditation_technique_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    favorites: User[];
}
