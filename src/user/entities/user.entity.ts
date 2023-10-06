import { Message } from "src/message/entities/message.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    decription: string;

    @OneToMany(() => Message, (message) => message.sender, { cascade: true })
    messageSent: Message[];

    @OneToMany(() => Message, (message) => message.receiver, { cascade: true })
    messageReceived: Message[];
}
