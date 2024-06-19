import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./databases/dbConnection.js";
import categoryRouter from "./src/modules/categories/categories.routes.js";
import morgan from "morgan";
import AppError from "./src/utils/services/AppError.js";
import globalError from "./src/utils/middleware/globalErrorHandle.js";
<<<<<<< HEAD
import subCategoryRouter from "./src/modules/subCategories/subCategories.routes.js";
=======
>>>>>>> 3c76fd021d4d74f0197824b892c4326aad3efad4

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/category", categoryRouter);
<<<<<<< HEAD
app.use("/api/v1/subcategory", subCategoryRouter);
=======
>>>>>>> 3c76fd021d4d74f0197824b892c4326aad3efad4

app.all(
  "*",
  (req, res, next) =>
    next(new AppError(`can't find this route : ${req.originalUrl}`, 404))
  //  res.json({ message: `can't find this route : ${req.originalUrl}` })}
);

app.use(globalError);

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
})