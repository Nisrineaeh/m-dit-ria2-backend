import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    user_id: User;

}
