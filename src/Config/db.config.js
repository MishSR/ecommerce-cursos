import mongoose from "mongoose";

const connectDB = async () => {
    try {
    const con = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce-cursos", 
     );
     console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { connectDB };
