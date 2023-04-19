const db = require("../db/db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

try {
  db.connectToDB();
} catch (err) {
  console.log(err);
}

const MediaSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  to_watch: {
    type: Boolean,
    default: false,
  },
  media_type: {
    type: String,
  },
});

const Media = mongoose.model("media", MediaSchema);

module.exports = Media;
