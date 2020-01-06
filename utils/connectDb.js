// import mongoose from "mongoose";

// const connection = {};

// async function connectDb() {
//   if (connection.isConnected) {
//     // Use existing database connection
//     console.log("Using existing connection");
//     return;
//   }
//   // Use new database connection
//   const db = await mongoose.connect(process.env.MONGO_SRV, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   console.log("DB Connected");
//   connection.isConnected = db.connections[0].readyState;
// }

// export default connectDb;

import mongoose from 'mongoose';
const connection = {}

async function connectDb(){

    if (connection.isConnected){
        //USE existing DB Connection
        console.log('Using existing connection');
        return;//if we are already connected no need to connect again
    }

    try {
        //connect to DB
        const db = await mongoose.connect(process.env.MONGO_SRV, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
            // ,
            // useUnifiedTopology: true
        });

        console.log('DB Connected!');
        //this is the way of connecting a serverless app to mongo
        connection.isConnected = db.connections[0].readyState;        
    } catch (error) {
        console.log(error);
    }

}

export default connectDb;