import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
    
    @Column()
    content: string;

    @ManyToOne(()=> User, (user)=> user.messageSent, {eager: true})
    @JoinColumn({name: 'sender_id'})
    sender: User;

    @ManyToOne(()=> User, (user)=> user.messageReceived, {eager:true})
    receiver: User;
}
