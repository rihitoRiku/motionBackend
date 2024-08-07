import express from "express";
import { getAllUser, getUserId, patchUserStatus, getAllUserRoom, patchUserModule } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.get("/user", isAuthenticated, getUserId);
router.get("/alluser", isAuthenticated, getAllUser);
router.get("/alluser/:room", isAuthenticated, getAllUserRoom);
router.patch("/userstatus", isAuthenticated, patchUserStatus);
router.patch("/usermodule/:index", isAuthenticated, patchUserModule);

export default router;
