import dotenv from "dotenv"
import connectDB from "./DB/index.js"
import { app } from "./app.js"

const port = process.env.PORT || 4000
dotenv.config({
    path:"../env"
})

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.error(err);
    })
    
    app.listen(port,()=>{
        console.log(`Server is connected to port ${port}`);
    })
})
.catch((err)=>{
    console.log(`THERE IS AN ERROR IN CONNECTION TO MONGODB ${err}`);
    
})