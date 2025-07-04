import express from "express";
import { createServer } from "node:http" // connect express with socket
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controller/socketManager.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server); // io -> socketio

app.set("port", (process.env.PORT || 8000));
app.use(cors());

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true}));// someone does't misbehaive 

app.use("/api/v1/users", userRoutes);
//app.use("/api/v2/users",newUSerRoutes);

const start = async () => { // all this for socket connectoin  
    //mongo connection
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://viditpaladiya1:Vidit12@cluster0.kthvtjb.mongodb.net/")
    console.log(`Mongo connection: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {//port - 8000 from above 
        console.log("Server listening on port 8000");
        console.log("listening");
    });
}
start();




