import { Document } from 'mongoose';
export interface Lesson extends Document{
    readonly title: string;
    readonly order_num: number;
    readonly letters: string[];
}