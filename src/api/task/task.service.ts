import Task from "../../models/task.model";
import { ITaskCreate } from "../../types/task.type";
import TaskRepository from "./task.repository";
import { HttpExceptionNotFound } from "../../exceptions/HttpException";

class TaskService {
  private taskRepo = new TaskRepository();

  public create = async (userData: ITaskCreate): Promise<Task> => {
    const task = await this.taskRepo.create(userData);
    return task;
  };

  public findAll = async (): Promise<Task[]> => {
    const tasks = await this.taskRepo.findAll();
    return tasks;
  };

  public findOne = async (id: string): Promise<Task | null> => {
    const task = await this.taskRepo.findOne(id);

    if (!task) {
      throw new HttpExceptionNotFound("id task not found");
    }

    return task;
  };

  public update = async (
    id: string,
    userData: ITaskCreate
  ): Promise<Task | null> => {
    const checkId = await this.taskRepo.findOne(id);
    if (!checkId) {
      throw new HttpExceptionNotFound("id task not found");
    }

    const task = await this.taskRepo.update(id, userData);
    return task;
  };

  public delete = async (id: string): Promise<number> => {
    const checkId = await this.taskRepo.findOne(id);
    if (!checkId) {
      throw new HttpExceptionNotFound("id task not found");
    }

    const task = await this.taskRepo.delete(id);
    return task;
  };
}

export default TaskService;
