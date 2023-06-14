const mongoose = require('mongoose');
const Folder = require('./folderModel')


const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  path: {
    type: String,
    // required: true
  },
  folder:{
    type: mongoose.Schema.ObjectId,
      ref: "Folder",
  },
  

  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },

});

// fileSchema.methods.addFile = function (folder,file) {
  
      
      
// };

const File = mongoose.model('File', fileSchema);

module.exports = File;
