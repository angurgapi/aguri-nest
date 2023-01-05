import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonController } from './lesson.controller';
import { LessonSchema } from './lesson.schema';
import { LessonService } from './lesson.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Lesson', schema: LessonSchema}])],
    controllers: [LessonController],
    providers: [LessonService],
    exports: [LessonService]
  })
  export class LessonModule {}