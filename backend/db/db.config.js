const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const uri = process.env.MONGO_CNN;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB Online!');
  } catch (error) {
    console.log(error);
    throw new Error("DB inizialization error");
  }
};

module.exports = dbConnection;
