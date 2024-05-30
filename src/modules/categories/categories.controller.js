import { categoryModel } from "../../../databases/models/category.model.js";
import slugify from "slugify";


const createCategory = async (req, res, next) => {
  let { name } = req.body;
  let results = new categoryModel({name, slug:slugify(name)})
  let added = await results.save();
  res.status(201).json({message: "Category created", results});
};

const getAllCategory = async (req, res, next) => {
  let results = await categoryModel.find({});
  res.json({ message: "the all categories are: ", results });
};

const getCategoryById = async (req, res, next) => {
  let { id } = req.params;
  let results = await categoryModel.findById(id);
  res.json({ message: "the category that you look for is: ", results });
};

const updateCategory = async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await categoryModel.findById(id,{name, slug:slugify(name,'#')},{new:true});
  res.json({ message: "this category is updated: ", results });
  !results && res.status(404).json("category not found")
  results && res.json({message:"Done", results})
//   if(!results)
//     {return res.status(404).json("category not found")}
// res.json({message:"Done", results})
};

const deleteCategory = async (req, res, next) => {
  let { id } = req.params;
  let results = await categoryModel.findByIdAndDelete(id);
  res.json({ message: "this category is deleted: ", results });
  !results && res.status(404).json("category not found")
  results && res.json({message:"Done", results})
};


export {getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory}