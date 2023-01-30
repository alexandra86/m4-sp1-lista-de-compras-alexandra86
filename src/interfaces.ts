export interface IlistNameRequest {
  listName: string;
  data: Array<IlistFiels>;
}

export interface IlistFiels {
  name: string;
  quantity: string;
}

export interface IlistName extends IlistNameRequest {
  id: number;
}

export type listNameRequestKeys = "name" | "quantity";
export type listFielsKeys = "listName" | "data";
