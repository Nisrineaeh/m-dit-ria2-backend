import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { MédiaModule } from './média/média.module';

@Module({
  imports: [UserModule, MessageModule, MédiaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
