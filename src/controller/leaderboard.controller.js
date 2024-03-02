import userModel from "../model/user.model.js";
import ResponseHandler from "../utils/responseHandler.js";

export const getLeaderboard = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next
) => {
  try {
    // Fetch all users
    const userid = req.user.id;
    const current_user = await userModel.findById(userid).exec();
    const users = await userModel
      .find({ role: "user", room: current_user.room })
      .sort({ challenge_point: -1 })
      .select("-password");
    if (!users || users.length === 0) {
      return next(ResponseHandler.errorResponse(res, 404, "No users found"));
    }
    return ResponseHandler.successResponse(res, 200, users);
  } catch (error) {
    return next(ResponseHandler.errorResponse(res, 500, error.message));
  }
};