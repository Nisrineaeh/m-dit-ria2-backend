import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, (user)=> user.favorites)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => MeditationTechnique, meditationTechnique => meditationTechnique.favorites)
    @JoinColumn({name : 'meditation_technique_id'})
    meditation_technique: MeditationTechnique;
}
