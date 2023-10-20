import { Injectable } from '@nestjs/common';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { FiltrTask } from './dto/filtrTask.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly projectService: ProjectsService,
  ) {}

  public async createTask(createDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createDto);
    return createdTask.save();
  }

  public readTask(id: string): Promise<Task> {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  public async updateTask(dto: UpdateTaskDto): Promise<string> {
    const keys = Object.keys(dto);
    const res = {};
    keys.shift();
    keys.forEach((el) => {
      res[el] = dto[el];
    });
    await this.taskModel.findOneAndUpdate({ _id: dto._id }, res);
    return 'Update was success!';
  }

  public async deleteTask(id: string): Promise<any> {
    return this.taskModel.deleteOne({ _id: id });
  }

  private findAll() {
    return this.taskModel.find();
  }

  public async filtrTask(dto: FiltrTask) {
    const arr = await this.findAll();
    let res = [];
    if (dto.projectId) {
      const listTasks = (await this.projectService.findOne(dto.projectId))
        .tasks;
      res = arr.filter((el) => {
        if (
          listTasks[0] !== undefined &&
          el._id.toString() === listTasks[0].toString()
        ) {
          listTasks.shift();
          return true;
        }
      });
    } else {
      res = await this.findAll();
    }

    if (dto.status) {
      res = res.filter((el) => el.status === dto.status);
    }

    if (dto.dateStart) {
      res = res.filter(
        (el) => Date.parse(el.createdAt) > Date.parse(dto.dateStart),
      );
    }

    if (dto.dateEnd) {
      res = res.filter(
        (el) => Date.parse(el.createdAt) < Date.parse(dto.dateEnd),
      );
    }

    return res;
  }
}
