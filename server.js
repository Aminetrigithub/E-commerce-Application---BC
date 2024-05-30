import express from "express";
import dotenv from "dotenv";
import {dbConnection }from "./databases/dbConnection.js";
import categoryRouter from "./src/modules/categories/categories.routes.js";
import morgan from "morgan";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('tiny'))
app.use('/api/v1/category',categoryRouter)
app.all("*", (req, res) =>
  res.json({ message: `can't find this route : ${req.originalUrl ,"****",req.url}` })
);

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
