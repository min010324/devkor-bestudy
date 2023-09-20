import { Body, Controller, Delete, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/users/:id")
  getUserNameById(@Param('id') id: number, @Res() res: Response) {
    try {
      res.json(this.appService.getUser(id));
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  @Get("/users")
  getUserNameList(@Res() res: Response) {
    try {
      res.json(this.appService.getUserList());
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  @Post("/users")
  insertUser(@Body('user') createUser: UserDto, @Res() res: Response) {
    try {
      this.logger.log(`create user name : ${createUser.userName}`);
      res.json(this.appService.insertUser(createUser));
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  @Delete("/users/:id")
  deleteUser(@Param("id") id: number, @Res() res: Response) {
    try {
      res.json(this.appService.deleteUser(id));
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
  // https://velog.io/@ehgks0000/HTTP-GET-DELETE-With-Body

}
