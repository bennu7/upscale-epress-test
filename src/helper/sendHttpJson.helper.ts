import { Response } from "express";

const SendHttpJson = (
  res: Response,
  status_code: number,
  message: string,
  data?: unknown,
  detail?: unknown
): void => {
  const response = data
    ? {
      status_code,
      message,
      data,
    }
    : {
      status_code,
      message,
      detail,
    };

  res.status(status_code).json({...response});
};

export default SendHttpJson;
