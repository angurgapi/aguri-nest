import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateWordDto } from 'src/word/dto/create-word.dto';
import { UpdateWordDto } from 'src/word/dto/update-word.dto';
import { WordService } from 'src/word/word.service';
@Controller('word')
export class WordController {
   constructor(private readonly wordService: WordService) { }
@Post()
   async createWord(@Res() response, @Body() createWordDto: CreateWordDto) {
  try {
    const newWord = await this.wordService.createWord(createWordDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Word has been created successfully',
    newWord,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Word not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateWord(@Res() response,@Param('id') wordId: string,
@Body() updateWordDto: UpdateWordDto) {
  try {
   const existingWord = await this.wordService.updateWord(wordId, updateWordDto);
  return response.status(HttpStatus.OK).json({
  message: 'Word has been successfully updated',
  existingWord,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getWords(@Res() response) {
try {
  const wordList = await this.wordService.getAllWords();
  return response.status(HttpStatus.OK).json({
  message: 'All words data found successfully',wordList,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}

@Get('/:id')
async getWord(@Res() response, @Param('id') wordId: string) {
 try {
    const existingWord = await
this.wordService.getWord(wordId);
    return response.status(HttpStatus.OK).json({
    message: 'Word found successfully',existingWord,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
async deleteWord(@Res() response, @Param('id') wordId: string)
{
  try {
    const deletedWord = await this.wordService.deleteWord(wordId);
    return response.status(HttpStatus.OK).json({
    message: 'Word deleted successfully',
    deletedWord,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}