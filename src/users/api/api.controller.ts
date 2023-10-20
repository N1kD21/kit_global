import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from '../users.service';

@Controller('api/')
export class ApiController {
  constructor(private readonly userService: UsersService) {}

  @Get('check')
  private check() {
    return '++';
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  private register(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }

  @Get('users')
  private showAllUsers() {
    return this.userService.findAll();
  }
}
