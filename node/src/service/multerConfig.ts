import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import express, { Request, Response, NextFunction } from "express";

const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  callback: FileFilterCallback
) => {
  callback(null, true); 
};

const upload: express.RequestHandler = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, 
}).single("file");

const uploadMiddleware = (
  req: Request,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) => {
  upload(req as any, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    next();
  });
};

export { upload, uploadMiddleware };
