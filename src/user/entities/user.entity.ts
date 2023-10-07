import { Message } from "src/message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @OneToMany(() => Message, (message) => message.sender, { cascade: true })
    messageSent: Message[];

    @OneToMany(() => Message, (message) => message.receiver, { cascade: true })
    messageReceived: Message[];
}
