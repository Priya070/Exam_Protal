const express = require("express");
const User = require("../schema/User.js");
const router = express.Router();
// User.use(bodyParser.json());
const { body, validationResult } = require("express-validator");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    // console.log(1);
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    console.log(user);
    user.save();
    res.send("user added");
  } catch (error) {
    res.status(404).send("error h");
  }
});

// Log in user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // console.log(email);
    try {
      // let user = User.findOne({ email: email });
      console.log(email);
      let user = await User.findOne({ email: email });
      console.log(user);

      if (!user) {
        return res.status(400).json({ error: "email galt h" });
      }

      let passwordCompare = await User.findOne({ password: password });
      // console.log(passwordCompare);
      if (password !== passwordCompare.password) {
        return res.status(400).json({ error: "password galt h" });
      }

      // const data = {
      //     user: {
      //         id: user.id
      //     }
      // }
      console.log("finish");
      // res.send("complete")
      return res.send(user.role);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
