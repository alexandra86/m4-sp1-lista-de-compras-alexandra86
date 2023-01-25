export interface IlistNameRequest {
  name: string;
  quantity: string;
}

export interface IlistName extends IlistNameRequest {
  id: number;
  listName: string;
}
