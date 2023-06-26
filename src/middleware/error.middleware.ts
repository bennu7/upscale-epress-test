/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-shadow */
import { Request, Response, NextFunction } from "express";
import STATUS from "http-status";

import { logger } from "../helper/logger.helper";
import sendHttpJson from "../helper/sendHttpJson.helper";

interface IErrorParent {
  code: string;
  detail: string;
}

interface IError {
  code: number | string;
  status: string;
  message: string;
  statusCode: number;
  name?: string;
  original?: string;
  parent?: IErrorParent;
}

const ErrorMiddleware = async (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("🪓🪓  ERROR.PARENT ->", err.parent + " <- 🪓🪓");
    console.log("😡😡 error.code => :", err.code);
    console.log("😡😡 error :", err);
    logger.error(`BUG INTERNAL : ${err}`);

    if (err.statusCode === 413) {
      return sendHttpJson(
        res,
        STATUS.REQUEST_ENTITY_TOO_LARGE,
        "REQUEST_ENTITY_TOO_LARGE"
      );
    }

    // sequelize error
    switch (err.parent?.code) {
      case "22P02": {
        const message = "Sequelize Invalid type of data.";
        return sendHttpJson(res, STATUS.BAD_REQUEST, message);
      }
      case "42703": {
        const message = "Sequelize Something went wrong.";
        return sendHttpJson(res, STATUS.INTERNAL_SERVER_ERROR, message);
      }
      case "23505": {
        const message = err.parent.detail;
        return sendHttpJson(res, STATUS.CONFLICT, message);
      }
    }

    const status_code = err.code || STATUS.INTERNAL_SERVER_ERROR;
    const message = err.message || "INTERNAL_SERVER_ERROR";

    return sendHttpJson(res, status_code as number, message);
  } catch (err) {
    next(err);
  }
};

export default ErrorMiddleware;
