import nodemailer from "nodemailer";

const email = "hackerufullstack@gmail.com";
const password = "bnxg yluu edtg ubiq";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const emailConfig = {
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
};
