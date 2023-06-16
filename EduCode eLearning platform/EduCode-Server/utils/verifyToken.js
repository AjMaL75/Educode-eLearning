import jwt from "jsonwebtoken";
import { createError } from "./error.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_data;
    if (!token) {
      return next(createError(400, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(createError(400, "token is invalid"));
      }
      req.admin = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.admin.isAdminvalue) {
        next();
      } else {
        res.status(400).json("You are not authorized");
      }
    });
  } catch (err) {
    next(err);
  }
};

export { verifyToken, verifyAdmin };
