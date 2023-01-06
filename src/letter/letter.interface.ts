import { Document, Schema } from 'mongoose';

export interface Letter extends Document{
    readonly value: string;
    readonly description: string;
    readonly transliteration: string;
}