const mongoose = require("mongoose");

const InvestigacionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String, required: true },
    activities: { type: Array },    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
