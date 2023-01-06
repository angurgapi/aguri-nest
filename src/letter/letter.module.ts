import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LetterController } from './letter.controller';
import { LetterSchema } from './letter.schema';
import { LetterService } from './letter.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Letter', schema: LetterSchema}])],
    controllers: [LetterController],
    providers: [LetterService],
    exports: [LetterService]
  })
  export class LetterModule {}