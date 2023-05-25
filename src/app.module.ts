import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './word/word.module';
import { LessonModule } from './lesson/lesson.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LetterModule } from './letter/letter.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mongodb',
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: parseInt(configService.get<string>('DATABASE_PORT')),
    //     username: configService.get<string>('DATABASE_USER'),
    //     password: configService.get<string>('DATABASE_PASS'),
    //     database: configService.get<string>('DATABASE_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService]
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://sof:erKfc5W-!42Dxh.@cluster0.vrzpc.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'bricks' },
    ),
    UserModule,
    AuthModule,
    WordModule,
    LessonModule,
    LetterModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
