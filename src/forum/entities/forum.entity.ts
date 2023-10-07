import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Forum {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column()
    message: string;

   @ManyToOne(()=> MeditationTechnique, (med_tec)=> med_tec.id, {eager: true})
   @JoinColumn({name:'meditation_technique_id'})
   meditation_technique: MeditationTechnique;

   @ManyToOne(()=> User, (user)=> user.id, {eager:true})
   @JoinColumn({ name: 'user_id'})
   user: User;
   

}
