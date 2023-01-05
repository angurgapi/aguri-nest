import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordController } from './word.controller';
import { WordSchema } from './word.schema';
import { WordService } from './word.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Word', schema: WordSchema}])],
    controllers: [WordController],
    providers: [WordService],
    exports: [WordService]
  })
  export class WordModule {}