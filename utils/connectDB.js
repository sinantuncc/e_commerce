import { connect, connections } from "mongoose";

const connectDB = async () => {
  if (connections[0].readyState) return;

  await connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    }
  );
};

export default connectDB;
