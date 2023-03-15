const userModel = require("../model/usermodel");

const registerLogin = async (req, res) => {
  // console.log('req', req);
  try {
    let user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");
    // console.log("user", user);
    const times = {
      expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // res.cookie("test", "test", options).cookie("access_token", token, options); //token contains a JWT string
    if (!user) {
      user = await userModel.create(req.body);

      const token = await user.genrateToken();

      await res.cookie("Token", token, times);

      return res.status(201).json({
        success: true,
        user,
      });
    }

    const token = await user.genrateToken();
    await res.cookie("Token", token, times);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  await res.cookie("Token", "", Date(Date.now()));
  // console.log(req.cookies);
  res.status(200).json({
    success: true,
  });
};

const getuser = async (req, res) => {
  const user = req.user;
  // console.log('user', user);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    user,
  });
};

module.exports = { registerLogin, getuser, logout };
