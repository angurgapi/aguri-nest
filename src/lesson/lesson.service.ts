import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/lesson/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilteredLessonsDto } from './dto/get-filtered-lessons.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
// import { Letter } from 'src/letter/letter.schema';

@Injectable()
export class LessonService {
  constructor(@InjectModel('Lesson') private lessonModel: Model<Lesson>) {}

  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const newLesson = await new this.lessonModel(createLessonDto);
    return newLesson.save();
  }

  async updateLesson(
    lessonId: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    const existingLesson = await this.lessonModel.findByIdAndUpdate(
      lessonId,
      updateLessonDto,
      { new: true },
    );
    if (!existingLesson) {
      throw new NotFoundException(`Lesson #${lessonId} not found!`);
    }
    return existingLesson;
  }

  async getAllLessons(): Promise<Lesson[]> {
    const lessonList = await this.lessonModel
      .find()
      .populate({ path: 'letters' });
    if (!lessonList || lessonList.length === 0) {
      throw new NotFoundException('No lessons found!');
    }
    return lessonList;
  }

  async getFilteredLessons(
    filterDto: GetFilteredLessonsDto,
  ): Promise<Lesson[] | any> {
    const search = filterDto;
    // console.log(search)
    const lessonList = await this.lessonModel
      .find(search)
      .populate('letters')
      .populate('words');
    if (!lessonList || lessonList.length === 0) {
      throw new NotFoundException('No lessons found');
    }
    return lessonList;
  }

  async getLesson(lessonId: string): Promise<Lesson> {
    try {
      const existingLesson = await this.lessonModel
        .findOne({ order_num: lessonId })
        .populate({ path: 'letters' })
        .populate('words');

      return existingLesson;
    } catch (error) {
      throw new NotFoundException(`Lesson with id ${lessonId} not found!`);
    }
  }

  async deleteLesson(lessonId: string): Promise<Lesson> {
    const deletedLesson = await this.lessonModel.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      throw new NotFoundException(`Lesson with id #${lessonId} not found!`);
    }
    return deletedLesson;
  }
}
