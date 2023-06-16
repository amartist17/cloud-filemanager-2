const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  desc: {
    type: String,
    required: true
  },
  files:  [
    {
      type: mongoose.Schema.ObjectId,
      ref: "File", 
    },
  ],
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
