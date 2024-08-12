import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';
@Injectable()
export class TasksService {
  // simula a la BBDD
  // al hacerlo asi, cuando recarguemos se borra, es solo local
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'This is task 1',
      status: TaskStatus.PENDING,
    },
  ];
  getAllTasks() {
    return this.tasks;
  }
  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTaksById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  updateTask(id: string, updatedFields: UpdateTaskDto): Task {
    const task = this.getTaksById(id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
}
