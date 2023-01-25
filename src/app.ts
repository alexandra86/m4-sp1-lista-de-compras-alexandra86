import express, { Application } from "express";
import { createList, searchList } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createList);

app.get("/purchaseList", searchList);

app.listen(3000, () => {
  console.log("Server is running!");
});
