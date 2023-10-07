import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, (user)=> user.id, {eager:true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(()=> MeditationTechnique, {eager: true})
    @JoinColumn({name : 'meditation_technique_id'})
    meditation_technique: MeditationTechnique;
}
