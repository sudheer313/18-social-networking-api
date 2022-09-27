const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-networking",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Use this to log queries
mongoose.set("debug", true);

module.exports = mongoose.connection;
