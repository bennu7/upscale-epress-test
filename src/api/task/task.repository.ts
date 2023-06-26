import Task from "../../models/task.model";
import { ITaskCreate } from "../../types/task.type";

class TaskRepository {
  public create = async (userData: ITaskCreate): Promise<Task> => {
    const task = new Task({
      title: userData.title,
      completed: userData.completed,
      description: userData.description,
    });
    await task.save();
    return task;
  };

  public findAll = async (): Promise<Task[]> => {
    const tasks = await Task.findAll();
    return tasks;
  };

  public findOne = async (id: string): Promise<Task | null> => {
    const task = await Task.findByPk(id);

    return task;
  };

  public update = async (
    id: string,
    userData: ITaskCreate
  ): Promise<Task | null> => {
    const task = await Task.findByPk(id);
    if (task) {
      await task.update({
        title: userData.title,
        completed: userData.completed,
        description: userData.description,
      });
    }
    return task;
  };

  public delete = async (id: string): Promise<number> => {
    const task = await Task.destroy({
      where: {
        id,
      },
    });

    return task;
  };
}

export default TaskRepository;
