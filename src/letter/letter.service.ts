import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Letter } from 'src/letter/letter.schema';


@Injectable()
export class LetterService {
    constructor(@InjectModel('Letter') private letterModel:Model<Letter>){}

    async getAllLetters(): Promise<Letter[]> {
        const letterList = await this.letterModel.find();
        if(!letterList || letterList.length === 0) {
            throw new NotFoundException('No letters found!');          
        }
        return letterList;
    }
    
    async getLetter(letterId: string): Promise<Letter> {
        const existingLetter = await this.letterModel.findById(letterId).exec();
        if(!existingLetter) {
            throw new NotFoundException(`Lesson with id #${letterId} not found!`);
        }
        return existingLetter;
    }


 }
