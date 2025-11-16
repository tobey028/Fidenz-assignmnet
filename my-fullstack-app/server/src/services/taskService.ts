import { AppDataSource } from '../data-source';
import { Task, TaskStatus, TaskPriority } from '../entities/Task';
import { FindOptionsWhere } from 'typeorm';

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedToId?: number;
  dueDate?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedToId?: number;
  dueDate?: string;
}

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  async createTask(data: CreateTaskDTO): Promise<Task> {
    const task = this.taskRepository.create(data);
    return await this.taskRepository.save(task);
  }

  async getTasks(filters?: {
    status?: TaskStatus;
    priority?: TaskPriority;
    assignedToId?: number;
  }): Promise<Task[]> {
    const where: FindOptionsWhere<Task> = {};
    
    if (filters?.status) where.status = filters.status;
    if (filters?.priority) where.priority = filters.priority;
    if (filters?.assignedToId) where.assignedToId = filters.assignedToId;

    return await this.taskRepository.find({
      where,
      relations: ['assignedTo'],
      order: { createdAt: 'DESC' }
    });
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedTo']
    });
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<Task> {
    const task = await this.getTaskById(id);
    
    if (!task) {
      throw new Error('Task not found');
    }

    Object.assign(task, data);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    
    if (result.affected === 0) {
      throw new Error('Task not found');
    }
  }
}