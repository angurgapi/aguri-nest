import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import {Types, Document} from 'mongoose'
import { Lesson } from "src/lesson/lesson.schema";

@Schema()
export class Letter extends Document {
   @Prop()
   value: string;
   @Prop()
   description: string;
   @Prop()
   transliteration: string;   
   @Prop({type:  Types.ObjectId, ref: 'Lesson'})
   lesson: Lesson;
}


export const LetterSchema = SchemaFactory.createForClass(Letter);