import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import hashFunction from "../middleware/hashFunction"; 

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.baseUrl === "/users" && req.method === "POST") {
      return next();
    }

    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("User does not exist", 401);

    if (req.body.password) {
      const hashedPassword = await hashFunction(req.body.password);
      req.body.password = hashedPassword;
    }

    if (id == user.id) return next();

    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "Only admin/The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
