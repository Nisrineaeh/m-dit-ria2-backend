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
    
    @OneToOne(() => Média)
    @JoinColumn({ name: 'audio_media_id' })
    audioMedia: Média;

    @OneToOne(() => Média)
    @JoinColumn({ name: 'visual_media_id' })
    visualMedia: Média;

    @OneToMany(()=> Forum, (forum)=> forum.meditation_technique)
    forums: Forum[];



}
