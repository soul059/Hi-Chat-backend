import  express  from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

const corsOption = {
    origin: process.env.CROS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

// import routers
import userRouter from './routes/user.routes.js'
import roomRouter from  './routes/room.routes.js'
import chatRouter from  './routes/chat.routes.js'

//routs
app.use("/api/user", userRouter)
app.use('/api/room',roomRouter)
app.use("/api/chat",chatRouter)

export {app}