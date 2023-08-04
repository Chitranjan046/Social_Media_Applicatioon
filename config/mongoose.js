const mongoose = require("mongoose");

const DB = process.env.DB_CPX_SOCIAL;

// const  DB = "mongodb://127.0.0.1/Cpx_Social_Media"


mongoose
  .connect(DB)
  .then(() => {
    console.log("DataBase Connection SuccessFull");
  })
  .catch((err) => console.log("No Connection Sonething Error" + err));

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Error in Connecting Database"));

db.once("open", function () {
  console.log("SuccesFull Connected To the Database");
});

module.exports = db;











// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1/Cpx_Social_Media", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
// db.once("open", function () {
//   console.log("Connected to Database:: MongoDB");
// });

// module.exports = db;
