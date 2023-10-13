import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { MédiaModule } from './média/média.module';
import { MeditationTechniqueModule } from './meditation_technique/meditation_technique.module';
import { ForumModule } from './forum/forum.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Message } from './message/entities/message.entity';
import { Média } from './média/entities/média.entity';
import { Forum } from './forum/entities/forum.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MeditationTechnique } from './meditation_technique/entities/meditation_technique.entity';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: [`.env`]}),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [User, Message, MeditationTechnique, Média, Forum, Favorite],
    synchronize: false,
    logging: false,
  }),
 
  UserModule, MessageModule, MédiaModule, MeditationTechniqueModule, ForumModule, FavoriteModule, AuthModule, ChatGateway, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
