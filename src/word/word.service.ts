import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWordDto } from 'src/word/dto/create-word.dto';
import { Word } from 'src/word/word.interface';
import { Model } from "mongoose";
import { UpdateWordDto } from 'src/word/dto/update-word.dto';
import { Not } from 'typeorm';

@Injectable()
export class WordService {
    constructor(@InjectModel('Word') private wordModel:Model<Word>){}

    async createWord(createWordDto: CreateWordDto):
    Promise<Word> {
        const newWord = await new this.wordModel(createWordDto);
        return newWord.save();
    }

    async updateWord(wordId: string, updateWordDto: UpdateWordDto): 
    Promise<Word> {
        const existingWord = await this.wordModel.findByIdAndUpdate(wordId, updateWordDto, {new: true});
        if(!existingWord) {
            throw new NotFoundException(`Word #${wordId} not found!`);
        }
        return existingWord
    }

    async getAllWords(): Promise<Word[]> {
        const wordList = await this.wordModel.find();
        if(!wordList || wordList.length === 0) {
            throw new NotFoundException('No words found!');          
        }
        return wordList;
    }
    
    async getWord(wordId: string): Promise<Word> {
        const existingWord = await this.wordModel.findById(wordId).exec();
        if(!existingWord) {
            throw new NotFoundException(`Word with id #${wordId} not found!`);
        }
        return existingWord;
    }

    async deleteWord(wordId: string): Promise<Word>{
        const deletedWord = await this.wordModel.findByIdAndDelete(wordId);
        if(!deletedWord) {
            throw new NotFoundException(`Word with id #${wordId} not found!`)
        }
        return deletedWord
    }
 }
