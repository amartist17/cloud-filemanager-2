const User = require("./../models/userModel");
const File = require("./../models/fileModel");
const Folder = require("./../models/folderModel");

exports.home = async (req, res, next) => {
  res.status(200).render("index");
};

exports.files = async (req, res, next) => {
  res.status(200).render("files");
};

exports.contact = async (req, res, next) => {
  res.status(200).render("contact");
};

exports.login = async (req, res, next) => {
  res.status(200).render('login');
};

exports.addFile = async (req, res, next) => {
  let folders = await Folder.find()
  let files = await File.find().populate('folder')
  console.log(files)
  res.status(200).render('dashboard/add-file', {folders,files});
};

exports.addUser = async (req, res, next) => {
  const users = await User.find({role:'user'})
  
  res.status(200).render('dashboard/add-user', {users});
};

exports.addFolder = async (req, res, next) => {
  let folders = await Folder.find()

  res.status(200).render('dashboard/add-folder',{folders});
};