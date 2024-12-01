const { DB_URL } = process.env;
const mongoose = require("mongoose");
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const otpSchema = mongoose.Schema({
  email: String,
  otp: String,
});

const Otp = mongoose.model("otp", otpSchema);

// Connect to the database once when the server starts
mongoose.connect(DB_URL, connectOptions)
  .then(() => {
    console.log("OTP Database connected successfully!");
  })
  .catch((err) => {
    console.error("OTP  Error while connecting to the database: ", err);
  });

// Event listeners for mongoose connection
// mongoose.connection.on("connected", () => {
//   console.log("OTP  Database connected!");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("OTP  Database connection error: ", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("OTP Database disconnected.");
// });

exports.createNewOtp = async (otp, email) => {
  try {
    console.log("Creating OTP for email:", email);

    let newOtp = new Otp({
      email: email,
      otp: otp,
    });

    let result = await newOtp.save();
    console.log("OTP created:", result);
    return result;
  } catch (err) {
    console.error("Error in creating OTP: ", err);
    throw new Error(err);
  }
};

exports.checkOtp = async (email, otp) => {
  try {
    console.log("Checking OTP for email:", email);

    let result = await Otp.findOne({ email: email, otp: otp });
    console.log("OTP check result:", result);
    return result;
  } catch (err) {
    console.error("Error in checking OTP: ", err);
    throw new Error(err);
  }
};

exports.deleteOtp = async (email) => {
  try {
    console.log("Deleting OTP for email:", email);

    let result = await Otp.deleteMany({ email: email });
    console.log("OTP deleted:", result);
    return result;
  } catch (err) {
    console.error("Error in deleting OTP: ", err);
    throw new Error(err);
  }
};
