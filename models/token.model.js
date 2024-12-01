const { DB_URL } = process.env;
const mongoose = require("mongoose");
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Define Token schema
const tokenSchema = mongoose.Schema({
  token: String,
});

const Token = mongoose.model("token", tokenSchema);

// Connect to the database once when the server starts
mongoose.connect(DB_URL, connectOptions)
  .then(() => {
    console.log("Token database connected!");
  })
  .catch((err) => {
    console.error("Error while connecting to the database: ", err);
  });

// // Event listeners for mongoose connection
// mongoose.connection.on("connected", () => {
//   console.log("Token database connected!");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("Database connection error: ", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Database disconnected.");
// });

// Create a new token
exports.createNewToken = async (token) => {
  try {
    console.log("Creating new token:", token);

    let newToken = new Token({
      token: token,
    });

    let result = await newToken.save();
    console.log("Token created:", result);
    return result;
  } catch (err) {
    console.error("Error in creating token: ", err);
    throw new Error(err);
  }
};

// Check if token exists
exports.checkToken = async (token) => {
  try {
    console.log("Checking token:", token);

    let result = await Token.findOne({ token: token });
    console.log("Token check result:", result);
    return result;
  } catch (err) {
    console.error("Error in checking token: ", err);
    throw new Error(err);
  }
};

// Delete token
exports.deleteToken = async (token) => {
  try {
    console.log("Deleting token:", token);

    let result = await Token.deleteOne({ token: token });
    console.log("Token deleted:", result);
    return result;
  } catch (err) {
    console.error("Error in deleting token: ", err);
    throw new Error(err);
  }
};
