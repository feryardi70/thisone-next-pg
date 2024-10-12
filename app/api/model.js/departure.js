import mongoose, { Schema } from "mongoose";

const departureSchema = new Schema({
  airline: { type: String, default: "IW" },
  flightnumber: Number,
  destination: String,
  departdate: String,
  departtime: String,
  gate: { type: String, default: "00" },
  remark: String,
});

const Departure = mongoose.models.Departure || mongoose.model("Departure", departureSchema);

export default Departure;
