import express from "express";
import multer from "multer";
import cloudinary from "../";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, { folder: "bank_accounts" });

        // Delete local file after upload
        fs.unlinkSync(filePath);

        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
});

export default router;