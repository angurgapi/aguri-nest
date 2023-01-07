import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Types, Document} from 'mongoose'
import { Lesson } from "src/lesson/lesson.schema";

@Schema()
export class Word {
   @Prop()
   value: string;
   @Prop()
   hint: string;
   @Prop()
   transliteration: string;
   @Prop({type:  Types.ObjectId, ref: 'Lesson'})
   lesson: Lesson;
}


export const WordSchema = SchemaFactory.createForClass(Word);