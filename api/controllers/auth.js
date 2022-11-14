import { db } from "../db.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);

    if (data.length) return res.status(409).json("User already exists");

    // Hash password in database for securiry purpose

    const salt = bycrypt.genSaltSync(10);

    const hash = bycrypt.hashSync(req.body.password, salt);

    // create a new user

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  //Check if the user exsits or not

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // if no err, and user is exist, we are going to check password

    const isPasswordCorrect = bycrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // if password is not correct

    if (!isPasswordCorrect)
      return res.status(400).json("wrong username or password!");

    // login, but save user info token inside the cookie
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
