import Router from "express";
import { privateKey } from "../../config/privateKeys.js";
import {
  catchAsyncAction,
  makeResponse,
  responseMessages,
  statusCodes,
} from "../../helpers/index.js";
import { validators } from "../../middleware/index.js";
import config from "config";
import thirdParty from "third-party-diginode";

import { addUser, findUser, matchPassword } from "../../services/index.js";

import { createClient } from "redis";
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
//Response messages
const {
  SIGN_UP,
  ALREADY_EXIST,
  INVALID,
  MULTIPLE_EXIST,
  LOGIN,
  USER_NOT_EXIST,
  THIRD_PARTY_SERVICE,
} = responseMessages;
//Response Status code
const { SUCCESS, NOT_FOUND, BAD_REQUEST, RECORD_ALREADY_EXISTS } = statusCodes;

const router = Router();

//USER SIGN-UP
router.post(
  "/signup",
  validators("SIGNUP"),
  catchAsyncAction(async (req, res) => {
    const checkUser = await findUser(req);
    if (checkUser)
      return makeResponse(res, RECORD_ALREADY_EXISTS, false, ALREADY_EXIST);
    const newUser = await addUser(req);
    return makeResponse(res, SUCCESS, true, SIGN_UP, newUser);
  })
);

//LOGIN

await client.set("count", "0"); // set count value ZERO

router.post(
  "/login",
  validators("LOGIN"),
  catchAsyncAction(async (req, res) => {
    const checkValidationValue = thirdParty.thirdPartyService();
    if (checkValidationValue === false)
      return makeResponse(res, BAD_REQUEST, false, THIRD_PARTY_SERVICE);
    let value = await client.get("count");
    let setValue = parseInt(value) + 1;
    client.set("count", JSON.stringify(setValue));
    value = await client.get("count");
    if (parseInt(value) % 5 === 0)
      return makeResponse(res, BAD_REQUEST, false, MULTIPLE_EXIST);
    const checkUser = await findUser(req);
    if (!checkUser) {
      return makeResponse(res, BAD_REQUEST, false, USER_NOT_EXIST);
    } else {
      const passwordCorrect = await matchPassword(
        req.body.password,
        checkUser.password
      );
      if (!passwordCorrect) {
        return makeResponse(res, BAD_REQUEST, false, INVALID);
      } else {
        return makeResponse(res, SUCCESS, true, LOGIN);
      }
    }
  })
);

export const userController = router;
