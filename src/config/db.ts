import { config } from "dotenv";
config();

import mongoose from "mongoose";

const options:any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    
}

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string, options );
    } catch (error) {
        console.log(error)
        console.error("Failed to connect to the database ... ");
        
        console.log(process.env.DB_URL)
        process.exit(1);
    }
};

connectToDb().then();
