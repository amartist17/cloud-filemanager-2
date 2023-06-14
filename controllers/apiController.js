const User = require("./../models/userModel");
const File = require("./../models/fileModel");
const Folder = require("./../models/folderModel");
const path = require("path");
const { unlink } = require('fs');





exports.addFolder = async (req, res, next) => {
    try {
      let newFolder = await Folder.create(req.body)
      res.redirect("/dashboard/add-folder")
    } catch (error) {
      res.json({
        error
      })
    }
  };


  exports.addUser = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
          //   passwordConfirm: req.body.passwordConfirm,
          });
        res.redirect("/dashboard/add-user")
    } catch (err) {
        // let message = `Duplicate value: ${Object.values(err.keyValue)[0]} for ${
        //     Object.keys(err.keyValue)[0]
        //   } field`;
        //   return res.render("error", {
        //     status: 400,
        //     message: message,
        //   });
        console.log(err)
        res.json(err)
    }
    
  };

  exports.removeUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body.id)
        return res.redirect("/dashboard/add-user")
    } catch (err) {
        // let message = `Duplicate value: ${Object.values(err.keyValue)[0]} for ${
        //     Object.keys(err.keyValue)[0]
        //   } field`;
        //   return res.render("error", {
        //     status: 400,
        //     message: message,
        //   });
        console.log(err)
        res.json(err)
    }
    
  };

  exports.addFile = async (req, res, next) => {
    try {
      // newFile.addFile(req.body.folder,req.files.file)
      if(req.files){
        let file = req.files.file
      let filename = req.body.name; 
      req.body.path= filename+ path.extname(file.name)

      //create file
      const newFile = await File.create(req.body)

      //move file
      file.mv( 
          path.join(__dirname, "../static", "files/" + req.body.path), 
          async function (err){ 
            if (err) { 
              return res.status(500).json({
                err
              }); 
            } 
          } 
        ); 
      
      //push file in folder
        await Folder.findByIdAndUpdate(req.body.folder,
          { $push: { files: newFile }}          )
        res.redirect("/dashboard")
      }
      // console.log(req.files)
      
    } catch (err) {

        console.log(err)
        res.json(err)
    }
    
  };

  exports.removeFile = async (req, res, next) => {
    try {
      let file = await File.findById(req.body.file)
      unlink('./static/files/' + file.path, (err) => {
        if (err) throw err;
        console.log('Deleted');
        
      })

      //push file in folder
      await Folder.findByIdAndUpdate(file.folder,
          { $pull: { files: file._id }})
      

      await File.findByIdAndDelete(req.body.file)

 
      res.redirect("/dashboard")
    } catch (error) {
      console.log(error)
      res.json({
        error
      })
    }
  };