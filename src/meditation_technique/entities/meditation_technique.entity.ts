import { Forum } from "src/forum/entities/forum.entity";
import { Média } from "src/média/entities/média.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'meditation_technique'})
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

    @ManyToOne(()=> User, (user)=> user.id, {eager: true})
    @JoinColumn({ name: 'user_id'})
    createdBy: User;
    
    @OneToOne(()=> Média, (média)=> média.id, {eager: true})
    @JoinColumn({name: 'media_id'})
    média: Média;

    @OneToMany(()=> Forum, (forum)=> forum.id)
    @JoinColumn({name: 'forum_id'})
    forum: Forum;



}
