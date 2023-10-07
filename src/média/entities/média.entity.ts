import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Média {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mimetype: string;

    @Column()
    size: number;

    @Column()
    description: string;

    @ManyToOne(()=> User, (user)=> user.id, {eager:true})
    @JoinColumn({ name: "user_id" })
    user_id: User;

}
