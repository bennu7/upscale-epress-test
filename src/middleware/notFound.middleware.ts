import { Request, Response, NextFunction } from "express";
import SendHttpJson from "../helper/sendHttpJson.helper";

const NotFoundMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    return SendHttpJson(res, 404, "OOPS! not found route");
  } catch (err) {
    return next(err);
  }
};

export default NotFoundMiddleware;
