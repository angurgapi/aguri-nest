import { Document, Schema } from 'mongoose';

export interface Letter extends Document {
  readonly value: string;
  readonly description: string;
  readonly ru: string;
  readonly en: string;
  readonly transliteration: string;
}
