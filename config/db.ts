import * as mongoose from "mongoose";
const connectToDatabase = async () =>{
    try{
        const connection = await mongoose.connect(process.env.database_uri);
        console.log("Successfully connected to the database!")
    }
    catch(err){
        console.log(`Unable to connect to database`, err);
    }
}

export default connectToDatabase;