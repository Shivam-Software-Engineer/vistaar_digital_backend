const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw", // 🔥 FIX (IMPORTANT)
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

module.exports = upload;