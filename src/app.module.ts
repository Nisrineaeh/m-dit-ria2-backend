import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { MédiaModule } from './média/média.module';
import { MeditationTechniqueModule } from './meditation_technique/meditation_technique.module';
import { ForumModule } from './forum/forum.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, MessageModule, MédiaModule, MeditationTechniqueModule, ForumModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
