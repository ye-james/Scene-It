const mongoose = require("mongoose");

module.exports = {
  connectToDB: () => {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@atlascluster.qvcywgh.mongodb.net/?retryWrites=true&w=majority`;
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "test",
      })
      .then((result) => {
        console.log("Mongoose connected to", result.connections[0].host);
      })
      .catch((err) => console.log("Error connecting to database", err));
  },
};
