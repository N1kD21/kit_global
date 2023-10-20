import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from '../dto/createProject.dto';
import { ProjectsService } from '../projects.service';
import { isValidObjectId } from 'mongoose';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.projectService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: CreateProjectDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.projectService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.projectService.delete(id);
  }

  @Patch('/:id/add-task/:taskId')
  addTask(@Param('id') projectId: string, @Param('taskId') taskId: string) {
    if (!isValidObjectId(projectId)) {
      throw new BadRequestException('Invalid projectId');
    }
    if (!isValidObjectId(taskId)) {
      throw new BadRequestException('Invalid taskId');
    }
    return this.projectService.addTask(taskId, projectId);
  }

  @Patch('/:id/remove-task/:taskId')
  removeTask(@Param('id') projectId: string, @Param('taskId') taskId: string) {
    if (!isValidObjectId(projectId)) {
      throw new BadRequestException('Invalid projectId');
    }
    if (!isValidObjectId(taskId)) {
      throw new BadRequestException('Invalid taskId');
    }
    return this.projectService.removeTask(taskId, projectId);
  }

  @Get('/:id/tasks')
  getTasks(@Param('id') projectId: string) {
    if (!isValidObjectId(projectId)) {
      throw new BadRequestException('Invalid projectId');
    }
    return this.projectService.getTasks(projectId);
  }
}
