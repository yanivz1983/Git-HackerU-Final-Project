import { RequestHandler } from "express";

const validateContactForm: RequestHandler = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }


  next(); 
};

export default validateContactForm;
