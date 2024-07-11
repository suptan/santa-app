import Joi from "joi";
import { NextFunction, Request, Response } from "express";

interface WishBody {
  name: string;
  msg: string;
}

const wishSchema = Joi.object({
  name: Joi.string().max(50).required(),
  msg: Joi.string().max(60000),
});

const wishValidator = (req: Request, res: Response, next: NextFunction) => {
  let status = 200;
  let message = "";
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body!" });
  }

  const { error } = wishSchema.validate(req.body);

  if (error) {
    status = 400;
    return res.status(400).json({
      message: error.details.map(({ message, type }) => ({
        message,
        type,
      })),
    });
  }

  next();
};

export { wishValidator, WishBody };
