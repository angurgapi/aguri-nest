import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, PopulatedDoc, SchemaTypes, Types } from "mongoose";
import { Letter } from 'src/letter/letter.schema'

@Schema()
export class Lesson extends Document{
   @Prop()
   title: string;
   @Prop()
   order_num: number;
   @Prop({type: [{type:  Types.ObjectId, ref: 'Letter'}]})
   letters: Letter[];
   // @Prop()
   // letters: [{type:  Types.ObjectId, ref: 'Letter'}];
}


export const LessonSchema = SchemaFactory.createForClass(Lesson);