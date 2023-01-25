import { Request, Response } from "express";
import { data, ids } from "./database";
import { IlistName, IlistNameRequest } from "./interfaces";

export const createList = (request: Request, response: Response): Response => {
  const listData: IlistNameRequest = request.body;

  let inicialId: number = 0;

  let id: number = (inicialId += 1);

  const idExists = ids.find((element) => element === id);

  if (idExists) {
    return response.status(409).json({
      message: "Id exists, try again.",
    });
  }

  const newListData: IlistName = {
    id: id,
    listName: "feira",
    ...listData,
  };
  ids.push(id);
  data.push(newListData);
  return response.status(201).json(newListData);
};

export const searchList = (request: Request, response: Response): Response => {
  return response.status(200).json(data);
};
