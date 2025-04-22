const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const jwtSecret = "This is a mernapp named ToolBox";


router.post("/createuser",
  [body('email', 'Syntax Error').isEmail(),
  body('name', 'Name is Required').isLength({ min: 5 }),
  body('password', 'Please Use a Strong Password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const SecPassword =  await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: SecPassword,
        email: req.body.email,
        location: req.body.location
      }).then(res.json({ success: true }));

    } catch (error) {
      console.log(error);
      res.json({ success: false });

    }
  })

router.post("/loginuser",
  [body('email', 'Syntax Error').isEmail(),
  body('password', 'Please Use a Strong Password').isLength({ min: 5 })],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let UserData = await User.findOne({ email });
      if (!UserData) {
        return res.status(400).json({ errors: "Try login with correct details" });
      }
      const PassCompare = await bcrypt.compare(req.body.password,UserData.password);
      if (!PassCompare) {
        return res.status(400).json({ errors: "Please enter the correct password" });
      }
      const data = {
        user: {
          id : UserData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });

    }
  })

module.exports = router;