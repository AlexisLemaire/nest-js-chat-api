import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { message } from './interfaces/message';

@Controller('messages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(@Res() rep) {
    this.appService.getMessages((res: any) => {
      rep.send(res);
    });
  }

  @Post()
  addOne(@Body() body: message): void {
    this.appService.addMessage(body);
  }

  @Delete()
  deleteAll(): void {
    this.appService.deleteMessages();
  }

  @Delete(':id')
  deleteOne(@Param('id') id : number): void {
    this.appService.deleteMessage(id);
  }
}
