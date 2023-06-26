/* eslint-disable indent */
import { Request, Response, NextFunction } from "express";
import STATUS from "http-status";
import {
  validationResult,
  body,
  ValidationChain,
  param,
} from "express-validator";

import { logger } from "../helper/logger.helper";
import SendHttpJson from "../helper/sendHttpJson.helper";

export type CheckData = "CreateTask" | "UpdateTask" | "DeleteTask" | "FindTask";

const ValidationMiddleware = (checkData: CheckData): ValidationChain[] => {
  switch (checkData) {
    case "CreateTask": {
      return [
        body("title", "required title type string min 3 character").isString(),
        body("description", "optional description type string min 15 character")
          .isString()
          .optional(),
        body("completed", "optional completed type boolean")
          .isBoolean()
          .optional(),
      ];
    }

    case "UpdateTask": {
      return [
        param("id", "required id  type uuid").isString().isUUID(),
        body("title", "required title type string min 3 character").isString(),
        body("description", "optional description type string min 10 character")
          .isString()
          .optional(),
        body("completed", "optional completed type boolean")
          .isBoolean()
          .optional(),
      ];
    }

    case "DeleteTask": {
      return [param("id", "required id type uuid").isString().isUUID()];
    }

    case "FindTask": {
      return [param("id", "required id type uuid").isString().isUUID()];
    }
  }

  return [];
};

const ValidationMessage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (!errors.length || errors.length === 0) return next();

  const result: string[] = [];
  errors.forEach((error) => {
    result.push(error.msg);
  });

  logger.info(
    `${req.method} ${STATUS.BAD_REQUEST} ${req.originalUrl} : ${result}`
  );

  return SendHttpJson(
    res,
    STATUS.BAD_REQUEST,
    "Oops! validation error",
    "",
    result
  );
};

export { ValidationMiddleware, ValidationMessage };
