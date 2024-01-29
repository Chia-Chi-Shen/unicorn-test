import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

let isConnected;
let connection;

  export default{

    connect: async ()=>{ 

        dotenv.config();

        if (isConnected) {
            console.log('Using existing database connection');
            return connection;
          }
        
        try {
        connection = await mongoose
            .connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    
        isConnected = connection.connections[0].readyState;
        console.log('New database connection');
        return connection;
        } 
        catch (error) {
        console.error('Error connecting to MongoDB:', error);
        }

        // mongoose
        //     .connect(process.env.MONGO_URL, {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     })
        //     .then((res) => console.log("mongo db connection created"))
        //     .catch((err) => console.log(err));
    }
}