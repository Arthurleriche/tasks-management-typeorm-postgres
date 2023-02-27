import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './tasks.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TasksRespository } from './Tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TasksRespository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRespository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id, user },
    });

    if (!found) throw new NotFoundException(`item with id ${id} not found`);

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  updateTaskStatus(id: string, status: TasksStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, status, user);
  }
}
