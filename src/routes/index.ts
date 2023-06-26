import { Router } from "express";
import { IRoutes } from "../types/route.type";
import TaskRoute from "../api/task/task.route";

class Routers {
  public router: Router = Router();
  private GroupRoutes: IRoutes[] = [new TaskRoute()];

  constructor() {
    this.initializeRoutes(this.GroupRoutes);
  }

  private initializeRoutes(routes: IRoutes[]): void {
    routes.forEach((route) => {
      this.router.use("/api/v1", route.router);
    });
  }
}

export default Routers;
