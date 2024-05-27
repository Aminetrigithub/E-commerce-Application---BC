import express from "express";
import dotenv from "dotenv";
import dbConnection from "./databases/dbConnection.js";
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.all("*", (req, res) =>
  res.json({ message: `can't find this route : ${req.originalUrl}` })
);

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
