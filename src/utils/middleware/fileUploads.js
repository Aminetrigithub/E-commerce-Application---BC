import multer from "multer"
import AppError from "../services/AppError.js"

export const uploadSingleFile = (folderName, filedName) => {  

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  function fileFilter (req, file, cb) {
    console.log(file)
    if(file.mimetype.startsWith("image")){
      cb(null, true)
    }else{
      cb(new AppError("invalid image", 400), false)
    }
  }
  
 const upload = multer({ storage, fileFilter }) 
return upload.single(filedName)

}