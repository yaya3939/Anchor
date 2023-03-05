const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../modules/User");
const auth = require("../../middleware/auth");
const { validateError, serverError } = require("../../middleware/errors");

//@route POST api/user/register
//@desc Register user
//@accsess Public
router.post(
  "/register",
  [
    [
      body("name", "Name is required").notEmpty(),
      body("email", "Please include a valid email").isEmail(),
      body(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    validateError,
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //localString will change date.now() to local date string,
      //but user.date type is date, so when string transform to date, it will become UTC again
      // const localDate = user.date.toLocaleDateString();
      // console.log(localDate);
      // user.date = localDate;

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      serverError(err, res);
    }
  }
);

//@route GET api/user
//@desc Get authorized user info
//@accsess Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    serverError(err, res);
  }
});

//@route POST api/user/login
//@desc login:authenticate user, get token
//@accsess Public
router.post(
  "/login",
  [
    [
      body("email", "Please include a valid email").isEmail(),
      body("password", "Password is required").notEmpty(),
    ],
    validateError,
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: { id: user.id },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      serverError(err, res);
    }
  }
);

//@route PUT api/user/userInfo
//@desc update name
//@accsess Private
router.put(
  "/userInfo",
  [auth, [body("name", "Please set a new name").notEmpty()], validateError],
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id).select("-password");
      user.name = req.body.name;
      await user.save();
      res.json(user);
    } catch (err) {
      serverError(err, res);
    }
  }
);

module.exports = router;
