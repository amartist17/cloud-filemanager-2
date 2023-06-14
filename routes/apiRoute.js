const express = require("express");
const viewController = require('../controllers/viewController')
const apiController = require('../controllers/apiController')
const authController = require('../controllers/authController')
const router = express.Router({ mergeParams: true });


router.post("/login", authController.login);
router.post("/add-user",authController.protect,authController.restrictTo('admin'), apiController.addUser);
router.post("/remove-user",authController.protect,authController.restrictTo('admin'), apiController.removeUser);
router.post("/remove-file",authController.protect,authController.restrictTo('admin'), apiController.removeFile);
router.post("/add-file", authController.protect,apiController.addFile);
router.post("/add-folder", authController.protect,apiController.addFolder);



module.exports = router;
