import { Request, response, Response } from "express";
import { data, ids } from "./database";
import {
  IlistFiels,
  IlistName,
  IlistNameRequest,
  listFielsKeys,
  listNameRequestKeys,
} from "./interfaces";

const validateDataList = (payload: any): IlistNameRequest => {
  if (typeof payload.listName !== "string") {
    throw new Error("The list name need to be a string");
  }

  const keys: Array<string> = Object.keys(payload);

  const requiredKeys: Array<listFielsKeys> = ["listName", "data"];
  const requiredKeysData: Array<listNameRequestKeys> = ["name", "quantity"];

  if (keys.length !== 2) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  const allRequiredFields: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  keys.forEach((key: string) => {
    if (!requiredKeys.includes(key as listFielsKeys)) {
      return response.status(400).json({
        message: `Required fields are: ${requiredKeys}`,
      });
    }
  });

  if (!allRequiredFields) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  payload.data.forEach((el: any) => {
    const dataKeys = Object.keys(el);
    if (dataKeys.length !== 2) {
      throw new Error(`Required keys are: ${requiredKeysData}`);
    }
    const allRequiredFieldsData: boolean = requiredKeysData.every(
      (key: string) => {
        return dataKeys.includes(key);
      }
    );

    if (!allRequiredFieldsData) {
      throw new Error(`Required keys are: ${requiredKeysData}`);
    }
  });

  return payload;
};

const validateUpdateItem = (payload: any): IlistFiels => {
  const keys: Array<string> = Object.keys(payload);

  const requiredKeys: Array<listNameRequestKeys> = ["name", "quantity"];

  if (keys.length === 1) {
    const allRequiredFields: boolean = requiredKeys.some((key: string) => {
      return keys.includes(key);
    });
    if (!allRequiredFields) {
      throw new Error(`Required keys are: ${requiredKeys}`);
    }
  }
  if (keys.length === 2) {
    const allRequiredFields: boolean = requiredKeys.every((key: string) => {
      return keys.includes(key);
    });

    if (!allRequiredFields) {
      throw new Error(`Required keys are: ${requiredKeys}`);
    }
  }
  if (keys.length > 2) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  if (
    typeof payload.quantity !== "string" ||
    typeof payload.name !== "string"
  ) {
    throw new Error("The list name need to be a string");
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

export const deleteItem = (request: Request, response: Response): Response => {
  const indexList: number = request.purchaseList.indexList;
  const nameItem = request.params.itemName;

  const itens = data[indexList].data;
  let item = itens.find((item) => item.name === nameItem);
  if (!item) {
    return response.status(404).json({
      message: `Item with name ${nameItem} does not exist`,
    });
  }
  const positionItem = itens.indexOf(item);
  itens.splice(positionItem, 1);

  return response.json();
};

export const updateItem = (request: Request, response: Response): Response => {
  try {
    const indexList: number = request.purchaseList.indexList;
    const nameItem = request.params.itemName;

    const itens = data[indexList].data;
    let item = itens.find((item) => item.name === nameItem);

    if (!item) {
      return response.status(404).json({
        message: `Item with name ${nameItem} does not exist`,
      });
    }
    const listData: IlistFiels = validateUpdateItem(request.body);
    const positionItem = itens.indexOf(item);
    itens[positionItem] = listData;
    return response.status(200).json(itens[positionItem]);
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
