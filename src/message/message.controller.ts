import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    const newMessage = this.messageService.create(createMessageDto);
    console.log('Evenement post message');
    return newMessage;
  }

  @Get('conversation/:user1Id/:user2Id')
  async findConversation(
    @Param('user1Id') user1Id: number,
    @Param('user2Id') user2Id: number,
  ) {
    return this.messageService.findConversation(user1Id, user2Id);
  }

  @Get('list/:userId')
  getUserConversations(@Param('userId') userId: number) {
    return this.messageService.getUserConversations(userId);
  }

  @Get('new/:afterId')
  getNewMessage(@Param('afterId') afterId: number) {
    return this.messageService.getMessagesAfterId(afterId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
