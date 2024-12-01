const { DB_URL } = process.env;
const mongoose = require("mongoose");
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const parkingSchema = mongoose.Schema(
  {
    slots: Array,
  },
  { versionKey: false }
);

const Parking = mongoose.model("parking", parkingSchema);

const checkDbConnection = () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Parking Database connected successfully!");
  } else if (mongoose.connection.readyState === 0) {
    console.log("Parking Database not connected.");
  } else {
    console.log("Parking Database connection status unknown.");
  }
};


exports.getParkingSlots = async () => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    const result = await Parking.findOne();
    mongoose.disconnect();
    return result;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.updateParkingSlots = async (data) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    const result = await Parking.findOneAndUpdate(
      {},
      {
        slots: data,
      },
      { new: true, upsert: true }
    );
    mongoose.disconnect();
    return result;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
