import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Forum {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column()
    name: string;

    @Column()
    message: string;

    @Column()
    user_id: number;

   @ManyToOne(()=> MeditationTechnique, (med_tec)=> med_tec.forums, {eager: true})
   @JoinColumn({name:'meditation_technique_id'})
   meditation_technique: MeditationTechnique;

   @ManyToOne(()=> User, (user)=> user.forums, {eager:true})
   @JoinColumn({ name: 'user_id'})
   user: User;
   

}