const filemodel = require("../model/fileupload");

const fileupload = async (req, res) => {
  try {
    // console.log("req", req.body);
    const file = await filemodel.create(req.body);
    console.log('file', file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "something wrong",
      });
    }
    return res.status(201).json({
      success: true,
      file,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      err,
    });
  }
};
const fileFinds = async (req, res) => {
    try {
    //   console.log("req", req.body);
      const file = await filemodel.find();
      console.log('file', file);
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "something wrong",
        });
      }
      return res.status(200).json({
        success: true,
        file,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        err,
      });
    }
  };
module.exports = { fileupload ,fileFinds};

