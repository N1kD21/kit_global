import { Injectable } from '@nestjs/common';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/createProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  create(project: CreateProjectDto) {
    return this.projectModel.create(project);
  }

  findAll() {
    return this.projectModel.find();
  }

  findOne(id: string) {
    return this.projectModel.findById(id);
  }

  update(id: string, dto: CreateProjectDto) {
    const keys = Object.keys(dto);
    const res = {};
    keys.forEach((el) => {
      res[el] = dto[el];
    });
    return this.projectModel.findByIdAndUpdate(id, res, { new: true });
  }

  delete(id: string) {
    return this.projectModel.findByIdAndRemove(id);
  }

  async addTask(taskId: string, projectId: string) {
    const res = await this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { tasks: taskId } },
      { new: true },
    );

    return res;
  }

  removeTask(taskId: string, projectId: string) {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { tasks: taskId } },
      { new: true },
    );
  }
  async getTasks(projectId: string) {
    const project = await this.projectModel
      .findById(projectId)
      .populate('projects');
    return project.tasks;
  }
}
