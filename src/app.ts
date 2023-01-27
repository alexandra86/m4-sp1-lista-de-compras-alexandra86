import express, { Application } from "express";
import {
  createList,
  searchList,
  retrieveList,
  deleteList,
  updateList,
} from "./logic";
import { ensureListExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createList);

app.get("/purchaseList", searchList);

app.get("/purchaseList/:id", ensureListExists, retrieveList);

app.delete("/purchaseList/:id", ensureListExists, deleteList);

app.patch("/purchaseList/:id", ensureListExists, updateList);

app.listen(3000, () => {
  console.log("Server is running!");
});
