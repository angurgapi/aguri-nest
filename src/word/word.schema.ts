import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Word {
   @Prop()
   value: string;
   @Prop()
   hint: string;
   @Prop()
   transliteration: string;
}


export const WordSchema = SchemaFactory.createForClass(Word);