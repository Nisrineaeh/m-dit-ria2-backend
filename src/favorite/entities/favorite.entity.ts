import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { JoinColumn, ManyToOne } from "typeorm";

export class Favorite {

    @ManyToOne(()=> User, (user)=> user.id, {eager:true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(()=> MeditationTechnique, (medtec)=> medtec.id, {eager: true})
    @JoinColumn({name : 'meditation_technique_id'})
    meditation_technique: MeditationTechnique;
}
