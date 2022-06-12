export const responseMessages = {
  ACCOUNT_DISABLED: "Your account is disabled please contact to admin",
  ALREADY_EXIST: "Username Aleardy Exist,Please Choose Different One",
  ALREADY_REGISTER: "Email already registered",
  REGISTERD: "Registered Successfully",
  USER_UPDATED: "User Updated Successfully",
  NUMBER_UPDATED: "Number Updated Successfully",
  GROUP_CREATED: "Group Created Successfully",
  INVALID_EMAIL: "Email not exist",
  INCORRECT_PASSWORD: "Incorrect password",
  LOGIN: "Logged in successfully",
  USER_NOT_FOUND: "User not found",
  SIGN_UP: "SIGNUP Successfully",
  INVALID: "Incorrect Password",
  MULTIPLE_EXIST: "Request Cannot be procceed as it is multiple of 5",
  USER_NOT_EXIST: "This user is not exist",
  LOGIN: "Successfully LOGIN",
  INCORRECT_USERNAME: "Username is incorrect",
  THIRD_PARTY_SERVICE:
    "You can't be procceed further as we get false from third party service ",
};

export const notificationPayload = {};

export const statusCodes = {
  SUCCESS: 200,
  RECORD_CREATED: 201,
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INVALID_REQUEST: 405,
  RECORD_ALREADY_EXISTS: 409,
  SERVER_ERROR: 500,
};

const makeResponse = async (
  res,
  statusCode,
  success,
  message,
  payload = null,
  meta = {}
) =>
  new Promise((resolve) => {
    res.status(statusCode).send({
      success,
      code: statusCode,
      message,
      data: payload,
      meta,
    });
    resolve(statusCode);
  });

export { makeResponse };
