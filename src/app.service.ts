import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  userNames: string[];

  constructor() {
    this.userNames = ['test1', 'test2', 'test3'];
  }

  getHello(): string {
    return 'Hello World!';
  }

  getUser(id: number): string {
    if (id < 0 || id >= this.userNames.length) throw new Error("Invalid index");
    return this.userNames[id];
  }

  getUserList(): string[] {
    return this.userNames;
  }

  insertUser(createUser: UserDto): void {
    const name: string = createUser.userName;
    if (name === "") throw new Error("Invalid name");
    this.userNames.push(name);
  }

  deleteUser(deleteId: number): void {
    if (deleteId < 0 || deleteId >= this.userNames.length) throw new Error("Invalid index");
    this.userNames.splice(deleteId, 1);
  }


}
