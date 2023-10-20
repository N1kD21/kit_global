import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './schema/project.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
