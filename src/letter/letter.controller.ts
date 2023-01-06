import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { LetterService } from 'src/letter/letter.service';
@Controller('letter')
export class LetterController {
   constructor(private readonly letterService: LetterService) { }


@Get()
async getLetters(@Res() response) {
try {
  const letterList = await this.letterService.getAllLetters();
  return response.status(HttpStatus.OK).json(
  letterList);
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}

@Get('/:id')
async getLetter(@Res() response, @Param('id') letterId: string) {
 try {
    const existingLetter = await
this.letterService.getLetter(letterId);
    return response.status(HttpStatus.OK).json(existingLetter);
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

}