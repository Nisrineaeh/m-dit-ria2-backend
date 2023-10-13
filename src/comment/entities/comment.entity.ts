import { MeditationTechnique } from "src/meditation_technique/entities/meditation_technique.entity";
import { User } from "src/user/entities/user.entity";
import { JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('comment')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column('text')
    comment: string;

    @ManyToOne(() => MeditationTechnique, (med_tec) => med_tec.comments, { eager: true })
    @JoinColumn({ name: 'meditation_technique_id' })
    meditationTechnique: MeditationTechnique;

    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

}
