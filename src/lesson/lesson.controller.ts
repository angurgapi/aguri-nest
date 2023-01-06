import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/lesson/dto/update-lesson.dto';
import { LessonService } from 'src/lesson/lesson.service';
@Controller('lesson')
export class LessonController {
   constructor(private readonly lessonService: LessonService) { }
@Post()
   async createLesson(@Res() response, @Body() createLessonDto: CreateLessonDto) {
  try {
    const newLesson = await this.lessonService.createLesson(createLessonDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Lesson has been created successfully',
    newLesson,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Lesson not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateLesson(@Res() response,@Param('id') lessonId: string,
@Body() updateLessonDto: UpdateLessonDto) {
  try {
   const existingLesson = await this.lessonService.updateLesson(lessonId, updateLessonDto);
  return response.status(HttpStatus.OK).json({
  message: 'Lesson has been successfully updated',
  existingLesson,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getLessons(@Res() response) {
try {
  const lessonList = await this.lessonService.getAllLessons();
  return response.status(HttpStatus.OK).json({
  message: 'All lessons data found successfully',lessonList});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}

@Get('/:id')
async getLesson(@Res() response, @Param('id') lessonId: string) {
 try {
    const existingLesson = await
this.lessonService.getLesson(lessonId);
    return response.status(HttpStatus.OK).json({
    message: 'Lesson found successfully',existingLesson,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
async deleteLesson(@Res() response, @Param('id') lessonId: string)
{
  try {
    const deletedLesson = await this.lessonService.deleteLesson(lessonId);
    return response.status(HttpStatus.OK).json({
    message: 'Lesson deleted successfully',
    deletedLesson,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}