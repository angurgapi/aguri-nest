import { Document } from 'mongoose';
export interface Word extends Document{
    readonly value: string;
    readonly hint: string;
    readonly transliteration: string;
}