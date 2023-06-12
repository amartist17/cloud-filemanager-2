const User = require("./../models/userModel");


exports.addFile = async (req, res, next) => {
    res.status(200).send("OKay added")
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