import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect(process.env.DB_CONNECTION).then(() => {
      console.log("db connection successfully ....................")
    }

    ).catch((err) => {
        console.log("db connection failed ********", err)
    }
    )
}