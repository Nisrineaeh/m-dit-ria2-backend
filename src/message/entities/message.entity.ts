import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
    
    @Column()
    content: string;

    @ManyToOne(()=> User, (user)=> user.messageSent, {eager: true})
    @JoinColumn({name: 'sender_id'})
    sender: User;

    @ManyToOne(()=> User, (user)=> user.messageReceived, {eager:true})
    @JoinColumn({ name: 'receiver_id' })
    receiver: User;
}
