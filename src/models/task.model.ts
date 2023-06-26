"use strict";
import { Model, DataTypes, Optional } from "sequelize";
import DB from "../config/db.config";

interface ITask {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

type TaskOptional = Optional<ITask, "id">;

class Task extends Model<ITask, TaskOptional> {
  declare id?: string;
  declare title: string;
  declare description?: string;
  declare completed?: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: DB.sequelize,
    modelName: "tasks",
    timestamps: true,
  }
);

export default Task;
