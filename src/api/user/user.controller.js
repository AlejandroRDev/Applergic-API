const User = require("./user.model");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/error/error");
const { generateSign, verifyJwt } = require("../../utils/jwt/jwtUtils");

const postNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    if (req.file) {
      newUser.image = req.file.path;
    }
    const userDuplicate = await User.findOne({ email: newUser.email });
    if (userDuplicate) {
      return next(setError(404, "Email existente"));
    }
    const userDB = await newUser.save();
    return res.status(201).json({ name: userDB.name, email: userDB.email });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    console.log(userDB);
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      const user = userDB._id;
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    error.message = "error Login";
    return next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    const despedida = "Bye bye";
    const token = null;
    return res.status(200).json({ token: token, message: despedida });
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDB = await User.findById(id);
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    return res
      .status(200)
      .json({
        name: userDB.name,
        email: userDB.email,
        allergies: userDB.allergies,
      });
  } catch (error) {
    return next(setError(404, "User server fail"));
  }
};

const getAllUser = async (req, res, next) => {
    try {
        const userDB = await User.find()
        const emails = userDB.map((user) => {
            console.log(user.email)
            return user.email
        })
        return res.status(200).json(emails)
    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

module.exports = {
  postNewUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUser
};
