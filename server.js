import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./databases/dbConnection.js";
import categoryRouter from "./src/modules/categories/categories.routes.js";
import morgan from "morgan";
import AppError from "./src/utils/services/AppError.js";
import globalError from "./src/utils/middleware/globalErrorHandle.js";

import subCategoryRouter from "./src/modules/subCategories/subCategories.routes.js";
import brandRouter from "./src/modules/brands/brands.routes.js";
import productRouter from "./src/modules/products/product.routes.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("uploads"))
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/category", categoryRouter);

app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/product", productRouter);



app.all("*", (req, res, next) =>
next(new AppError(`can't find this route : ${req.originalUrl}`, 404))
  //  res.json({ message: `can't find this route : ${req.originalUrl}` })}
);

app.use(globalError);

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
})