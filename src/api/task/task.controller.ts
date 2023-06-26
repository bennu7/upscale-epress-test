import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import TaskService from "./task.service";
import SendHttpJson from "../../helper/sendHttpJson.helper";

class TaskController {
  private taskService = new TaskService();

  public createTask = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { title, description, completed } = req.body;
      console.log(
        "🚀 ~ file: task.controller.ts:12 ~ TaskController ~ title:",
        title
      );

      const data = await this.taskService.create({
        title,
        description,
        completed,
      });

      return SendHttpJson(res, 201, "SUCCESS CREATED NEW TASK", data);
    }
  );

  public findTask = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await this.taskService.findOne(id);

    return SendHttpJson(res, 200, "SUCCESS GET DATA TASK", data);
  });

  public findAllTask = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const data = await this.taskService.findAll();

      return SendHttpJson(res, 200, "SUCCESS GET ALL DATA TASK", data);
    }
  );

  public updateTask = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const data = await this.taskService.update(id, {
        title,
        description,
        completed,
      });

      return SendHttpJson(res, 200, "SUCCESS UPDATED TASK", data);
    }
  );

  public deleteTask = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const deleted = await this.taskService.delete(id);

      return SendHttpJson(res, 200, `SUCCESS DELETE ${deleted} TASK`);
    }
  );
}

export default TaskController;
