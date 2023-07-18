import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): string {
    return `Welcome to Aguri API. <br/> 
    <b>Requests available:</b>
    <br/> 
    /lesson - get all lessons';
    <br/> 
    /lesson/id - get one lesson
    `;
  }
}
