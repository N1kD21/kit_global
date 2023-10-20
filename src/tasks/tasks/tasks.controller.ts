import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/createTask.dto';
import { TasksService } from '../tasks.service';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { isValidObjectId } from 'mongoose';
import { FiltrTask } from '../dto/filtrTask.dto';
import { Response } from 'express';

@Controller('tasks/')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  private createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get(':id')
  private async readTask(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const res = await this.taskService.readTask(id);
    if (!res) throw new NotFoundException();
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Patch()
  private async updateTask(@Body() dto: UpdateTaskDto, @Res() res: Response) {
    if (!isValidObjectId(dto._id)) {
      throw new BadRequestException('Invalid ID');
    }
    const response = await this.taskService.updateTask(dto);
    if (await this.taskService.updateTask(dto)) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      return response;
    }
  }

  @Delete(':id')
  private deleteTask(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.taskService.deleteTask(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('filtr')
  private filtrTask(@Body() dto: FiltrTask) {
    if (dto.projectId && !isValidObjectId(dto.projectId)) {
      throw new BadRequestException('Invalid projectId');
    }
    return this.taskService.filtrTask(dto);
  }
}
