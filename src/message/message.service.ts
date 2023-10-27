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
    const sendersQuery = this.messageRepository
      .createQueryBuilder("message")
      .select("message.sender_id", "sender_id")
      .where("message.receiver_id = :userId", { userId })
      .groupBy("message.sender_id");

    const receiversQuery = this.messageRepository
      .createQueryBuilder("message")
      .select("message.receiver_id", "receiver_id")
      .where("message.sender_id = :userId", { userId })
      .groupBy("message.receiver_id");

    const senders = await sendersQuery.getRawMany();
    const receivers = await receiversQuery.getRawMany();

    const allUserIds = [
      ...senders.map(s => s.sender_id),
      ...receivers.map(r => r.receiver_id)
    ];
    const uniqueUserIds = Array.from(new Set(allUserIds));

    const users = await this.userRepository.findByIds(uniqueUserIds);
    return users;
  }



}
