import { Request, Response } from "express";
import { data, ids } from "./database";
import {
  IlistName,
  IlistNameRequest,
  listFielsKeys,
  listNameRequestKeys,
} from "./interfaces";

const validateDataList = (payload: any): IlistNameRequest => {
  const keys: Array<string> = Object.keys(payload);
  const keysData = payload.data.map((el: any) => Object.keys(el));

  const requiredKeys: Array<listFielsKeys> = ["listName", "data"];
  const requiredKeysData: Array<listNameRequestKeys> = ["name", "quantity"];

  const allRequiredFields: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  const allRequiredFieldsData: boolean = requiredKeysData.every(
    (key: string) => {
      return keysData[0].includes(key);
    }
  );

  if (!allRequiredFields) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  if (!allRequiredFieldsData) {
    throw new Error(`Required keys are: ${requiredKeysData}`);
  }

  return payload;
};

export const createList = (request: Request, response: Response): Response => {
  try {
    const listData: IlistNameRequest = validateDataList(request.body);

    let inicialId: number = 1;

    let id: number = (inicialId += ids.length);

    const idExists = ids.find((element) => element === id);

    if (idExists) {
      return response.status(409).json({
        message: "Id exists, try again.",
      });
    }

    const newListData: IlistName = {
      id: id,
      ...listData,
    };
    ids.push(id);
    data.push(newListData);
    return response.status(201).json(newListData);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const searchList = (request: Request, response: Response): Response => {
  return response.status(200).json(data);
};

export const retrieveList = (
  request: Request,
  response: Response
): Response => {
  const indexList: number = request.purchaseList.indexList;
  return response.json(data[indexList]);
};

export const deleteList = (request: Request, response: Response): Response => {
  const indexList: number = request.purchaseList.indexList;

  data.splice(indexList, 1);

  return response.status(204).send();
};

export const updateList = (request: Request, response: Response): Response => {
  const indexList: number = request.purchaseList.indexList;

  data[indexList] = { ...data[indexList], ...request.body };

  return response.json(data[indexList]);
};
