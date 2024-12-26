const path = require('path')
const {StatusCodes}= require('http-status-codes')
const CustomError = require('../errors')
const { log } = require('console')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req,res)=>{
        if(!req.files){
            throw new CustomError.BadRequest('no file uploaded')
        }
    const  productImage = req.files.image;

        if(!productImage.mimetype.startsWith('image')){
            throw new CustomError.BadRequest('Please upload an image')
        }
        const maxSize = 1024 *1024;
        if(productImage.size > maxSize){
            throw new CustomError.BadRequest('Please upload a file smaller than 1MB')
        }
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`);
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src : `/uploads/${productImage.name}`}})
}

const uploadProductImage = async (req,res)=>{
    console.log(req.files.image)
const result = await cloudinary.uploader.upload(req.files.image.tempFilePath , {
    use_filename : true,
    folder : 'file-upload',
})
fs.unlinkSync(req.files.image.tempFilePath)
return res.status(StatusCodes.OK).json({iage :{src:result.secure_url}})
}



module.exports = {
    uploadProductImage
}