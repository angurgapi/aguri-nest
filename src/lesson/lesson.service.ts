import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Lesson } from 'src/lesson/lesson.interface';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Not } from 'typeorm';

@Injectable()
export class LessonService {
    constructor(@InjectModel('Lesson') private lessonModel:Model<Lesson>){}

    async createLesson(createLessonDto: CreateLessonDto):
    Promise<Lesson> {
        const newLesson = await new this.lessonModel(createLessonDto);
        return newLesson.save();
    }

    async updateLesson(lessonId: string, updateLessonDto: UpdateLessonDto): 
    Promise<Lesson> {
        const existingLesson = await this.lessonModel.findByIdAndUpdate(lessonId, updateLessonDto, {new: true});
        if(!existingLesson) {
            throw new NotFoundException(`Lesson #${lessonId} not found!`);
        }
        return existingLesson
    }

    async getAllLessons(): Promise<Lesson[]> {
        const lessonList = await this.lessonModel.find();
        if(!lessonList || lessonList.length === 0) {
            throw new NotFoundException('No lessons found!');          
        }
        return lessonList;
    }
    
    async getLesson(lessonId: string): Promise<Lesson> {
        const existingLesson = await this.lessonModel.findById(lessonId).exec();
        if(!existingLesson) {
            throw new NotFoundException(`Lesson with id #${lessonId} not found!`);
        }
        return existingLesson;
    }

    async deleteLesson(lessonId: string): Promise<Lesson>{
        const deletedLesson = await this.lessonModel.findByIdAndDelete(lessonId);
        if(!deletedLesson) {
            throw new NotFoundException(`Lesson with id #${lessonId} not found!`)
        }
        return deletedLesson
    }
 }
