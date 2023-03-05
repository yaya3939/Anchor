const mongoose = require("mongoose");

const AnchorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    require: true,
  },
  color: { type: String, require: true },
  from: { type: Date, require: true, default: Date.now },
  to: { type: Date },
  records: [
    {
      date: { type: Date, default: Date.now },
      rate: { type: Number, require: true },
      text: { type: String, require: true },
    },
  ],
});

module.exports = Anchor = mongoose.model("anchor", AnchorSchema);
