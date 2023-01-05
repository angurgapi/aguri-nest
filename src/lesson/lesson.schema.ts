import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Lesson {
   @Prop()
   title: string;
   @Prop()
   order_num: number;
   @Prop()
   letters: string[];
}


export const LessonSchema = SchemaFactory.createForClass(Lesson);