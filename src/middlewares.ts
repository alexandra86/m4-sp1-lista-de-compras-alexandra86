import { Request, Response, NextFunction } from "express";
import { data } from "./database";

export const ensureListExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);
  const indexList = data.findIndex((element) => element.id === id);

  if (indexList === -1) {
    return response.status(404).json({
      message: "list not found!",
    });
  }
  request.purchaseList = {
    indexList: indexList,
  };

  return next();
};
