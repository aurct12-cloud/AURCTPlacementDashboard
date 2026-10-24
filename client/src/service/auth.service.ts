import axios from "axios";

import publicAxios from "../api/publicAxios";
import authAxios from "../api/authAxios";

type LoginPayload = {
    registerNo?: string;
    mobileNo?: string;
    password: string;
    role: "STUDENT" | "FACULTY" | "ADMIN";
};

type RequestResetPayload = {
    registerNo?: string;
    mobileNo?: string;
    role: "STUDENT" | "FACULTY" | "ADMIN";
};

type VerifyOtpPayload = {
    registerNo?: string;
    mobileNo?: string;
    role: "STUDENT" | "FACULTY" | "ADMIN";
    otp: string;
};
let API_URL = 'http:'

export const AuthService = {

    login: (data: LoginPayload) => publicAxios.post('/api/auth/login', data),
    verifyToken: () => authAxios.get("/api/auth/verify-token"),
    requestPasswordReset: (data: RequestResetPayload) => publicAxios.post('/api/auth/request-password-reset', data),
    verifyOtp: async (data: VerifyOtpPayload) => publicAxios.post('/api/auth/verify-otp', data),

    // Reset password
    resetPassword: async (newPassword: string) => {
        const resetToken = localStorage.getItem("resetToken");
        if (!resetToken) {
        throw new Error("Reset token not found");
        }
        
        const response = await axios.post(
        `${API_URL}/reset-password`,
        { newPassword },
        {
            headers: {
            Authorization: `Bearer ${resetToken}`,
            },
        }
        );
        
        // Clear reset token after successful password reset
        localStorage.removeItem("resetToken");
        
        return response;
    },

    

    logout: () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        localStorage.removeItem("registerNo");
        localStorage.removeItem("mobileNo");
        localStorage.removeItem("email");
        localStorage.removeItem("profilePicture");
        localStorage.removeItem("department");
        localStorage.removeItem("resetToken");
    },

    getToken: () => localStorage.getItem("Token"),

    getUserDetails: () => {
        return {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        role: localStorage.getItem("role"),
        registerNo: localStorage.getItem("registerNo"),
        mobileNo: localStorage.getItem("mobileNo"),
        email: localStorage.getItem("email"),
        profilePicture: localStorage.getItem("profilePicture"),
        department: localStorage.getItem("department"),
        };
    },
};