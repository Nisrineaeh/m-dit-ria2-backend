import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>, @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id:  createMessageDto.senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: createMessageDto.receiverId } });

    if (!sender || !receiver) {
      throw new NotFoundException('Expéditeur ou destinataire non trouver !');
    }

    const message = new Message();
    message.content = createMessageDto.content;
    message.sender = sender;
    message.receiver = receiver;

    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ['sender', 'receiver'] });
  }

  async findConversation(user1Id: number, user2Id: number): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where("(message.sender = :user1Id AND message.receiver = :user2Id) OR (message.sender = :user2Id AND message.receiver = :user1Id)", { user1Id, user2Id })
      .orderBy('message.date', 'ASC')
      .getMany();
  }




  getMessagesAfterId(afterId: number): Promise<Message> {
    return this.messageRepository.findOne({
      where: { id: MoreThan(afterId) },
      order: { date: 'ASC' },
    });
  }


  async getUserConversations(userId: number): Promise<User[]> {
    const messagesSent = await this.messageRepository.find({ where: { id: userId } });
    const messagesReceived = await this.messageRepository.find({ where: { id: userId } });

    const usersSent = messagesSent.map(message => message.receiver);
    const usersReceived = messagesReceived.map(message => message.sender);

    const allUsers = [...usersSent, ...usersReceived];

    return Array.from(new Set(allUsers.map(u => u.id))).map(id => allUsers.find(u => u.id === id));
  }

  // async getUserConversations(userId: number): Promise<User[]> {
  //   const sendersQuery = this.messageRepository
  //     .createQueryBuilder("message")
  //     .select("message.id_user_send", "id_user_send")
  //     .where("message.id_user_received = :userId", { userId })
  //     .groupBy("message.id_user_send");

  //   const receiversQuery = this.messageRepository
  //     .createQueryBuilder("message")
  //     .select("message.id_user_received", "id_user_received")
  //     .where("message.id_user_send = :userId", { userId })
  //     .groupBy("message.id_user_received");

  //   const senders = await sendersQuery.getRawMany();
  //   const receivers = await receiversQuery.getRawMany();

  //   const allUserIds = [...senders.map(s => s.id_user_send), ...receivers.map(r => r.id_user_received)];
  //   const uniqueUserIds = Array.from(new Set(allUserIds));

  //   const users = await this.userRepository.findBy({ id: In(uniqueUserIds) });
  //   return users;
  // }


  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
