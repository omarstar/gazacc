const mongoose = require("mongoose");

let mongoUri = "mongodb://localhost:27017/GazaccDB";

mongoose.Promise = Promise;

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  console.log("Connect to mongo: ", mongoUri);
  mongoose.connect(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  return mongoose.connection;
};
