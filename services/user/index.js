import { User } from "../../models/index.js";
import { hashPassword } from "../common/index.js";

export const findUser = async (req) => {
  return await User.findOne({ name: req.body.name });
};

export const addUser = async (req) => {
  let user = await new User({
    name: req.body.name,
    password: await hashPassword(req.body.password),
  });

  await user.save();
  return user;
};
