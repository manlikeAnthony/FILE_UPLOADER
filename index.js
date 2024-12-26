require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express();
const PORT = process.env.PORT;
//database
const MONGO_URI = process.env.MONGO_URI
const connectDB = require('./database/connect');

//middleware
const NotFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
// product router
const productRouter = require('./routes/productRoutes');
const fileUpload = require('express-fileupload')
const cloudinary =require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({useTempFiles:true}))

app.get('/home' , (req,res)=>{
    res.send('FILE UPLOADER')
})

app.use('/api/v1/products' , productRouter)

app.use(errorHandlerMiddleware);
app.use(NotFoundMiddleware)
const start = async()=>{
    try {

        await connectDB(MONGO_URI);
        app.listen(PORT , console.log(`The app is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();