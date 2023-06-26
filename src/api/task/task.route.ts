import { Router } from "express";

import { IRoutes } from "../../types/route.type";
import TaskController from "./task.controller";
import {
  ValidationMiddleware,
  ValidationMessage,
} from "../../middleware/validation.middleware";

class TaskRoute implements IRoutes {
  path = "/task";
  router: Router = Router();
  private taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path + "s", this.taskController.findAllTask);

    this.router.post(
      this.path,
      ValidationMiddleware("CreateTask"),
      ValidationMessage,
      this.taskController.createTask
    );

    this.router.get(
      this.path + "s/:id",
      ValidationMiddleware("FindTask"),
      ValidationMessage,
      this.taskController.findTask
    );

    this.router.patch(
      this.path + "s/:id",
      ValidationMiddleware("UpdateTask"),
      ValidationMessage,
      this.taskController.updateTask
    );

    this.router.delete(
      this.path + "s/:id",
      ValidationMiddleware("DeleteTask"),
      ValidationMessage,
      this.taskController.deleteTask
    );
  }
}

export default TaskRoute;
