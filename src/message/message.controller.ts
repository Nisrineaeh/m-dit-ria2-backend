import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMessageDto: CreateMessageDto) {
    const newMessage = this.messageService.create(createMessageDto);
    console.log('Evenement post message');
    return newMessage;
  }

  @Get('conversation/:user1Id/:user2Id')
  @UseGuards(AuthGuard('jwt'))
  async findConversation(
    @Param('user1Id') user1Id: number,
    @Param('user2Id') user2Id: number,
  ) {
    return this.messageService.findConversation(user1Id, user2Id);
  }

  @Get('list/:userId')
  @UseGuards(AuthGuard('jwt'))
  getUserConversations(@Param('userId') userId: number) {
    return this.messageService.getUserConversations(userId);
  }

  @Get('new/:afterId')
  @UseGuards(AuthGuard('jwt'))
  getNewMessage(@Param('afterId') afterId: number) {
    return this.messageService.getMessagesAfterId(afterId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.messageService.findAll();
  }

}
