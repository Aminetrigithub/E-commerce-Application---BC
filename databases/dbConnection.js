import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/dbE-commerce').then(() => {
      console.log("db connection successfully ....................")
    }
    ).catch((err) => {
        console.log("db connection failed ********", err)
    }
    )
}