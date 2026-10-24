import express from "express";
import { login, verifyUserToken, requestPasswordReset, verifyOtp, resetPassword } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/verify-token", verifyToken, verifyUserToken);

export default router;