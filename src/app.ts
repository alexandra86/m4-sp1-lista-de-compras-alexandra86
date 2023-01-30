import express, { Application } from "express";
import {
  createList,
  searchList,
  retrieveList,
  deleteList,
  updateItem,
  deleteItem,
} from "./logic";
import { ensureListExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createList);

app.get("/purchaseList", searchList);

app.get("/purchaseList/:id", ensureListExists, retrieveList);

app.delete("/purchaseList/:id", ensureListExists, deleteList);

app.delete("/purchaseList/:id/:itemName", ensureListExists, deleteItem);

app.patch("/purchaseList/:id/:itemName", ensureListExists, updateItem);

app.listen(3000, () => {
  console.log("Server is running!");
});
