import nodemailer from "nodemailer";

const email = "hackerufullstack@gmail.com";
const password = "bnxg yluu edtg ubiq";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export default transporter;
