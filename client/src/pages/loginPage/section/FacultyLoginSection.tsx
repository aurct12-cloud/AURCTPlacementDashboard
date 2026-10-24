import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { isValidMobileNo } from "../../../utils/validation";
import { AuthService } from "../../../service/auth.service";
import LoginLoading from "../../../components/loadingComponent/loginPageLoading/LoginLoading";
import FacultyResetPassword from "../../../components/loginPageComponent/abcd2Modal";

type FacultyLoginSectionProps = {
    onFail: (title: string, message: string) => void;
    onSuccess: (title: string, message: string) => void;
    redirectPath: string;
};

const FacultyLoginSection: React.FC<FacultyLoginSectionProps> = ({
    onFail,
    onSuccess,
    redirectPath,
}) => {
    const navigate = useNavigate();

    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    // ✅ LOGIN HANDLER
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedMobile = mobileNo.trim();
        const trimmedPassword = password.trim();

        // validation
        if (!isValidMobileNo(trimmedMobile)) {
            onFail("Login Failed", "Enter a valid mobile number.");
            return;
        }

        if (!trimmedPassword) {
            onFail("Login Failed", "Enter your password.");
            return;
        }

        try {
            setLoginLoading(true);

            const response = await AuthService.login({
                mobileNo: trimmedMobile,
                password: trimmedPassword,
                role: "FACULTY",
            });

            // ✅ SUCCESS CHECK
            if (response?.status === 200 && response?.data?.status === "SUCCESS") {
                const data = response.data.data;
                localStorage.setItem("Token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("role", data.role);
                localStorage.setItem("mobileNo", data.mobileNo || "");
                localStorage.setItem("email", data.email || "");
                localStorage.setItem("department", data.department || "");
        
                // Save user's theme preference
                localStorage.setItem("userThemePreference", data.theme || "light");

                window.dispatchEvent(new Event("userUpdated"));

                navigate("/faculty");
            }
            else {
                onFail("Login Failed", response?.data?.message || "Invalid credentials");
            }
        }
        catch (err: any) {
            console.error("LOGIN ERROR:", err?.response?.data || err);

            if (err?.response?.status === 401) {
                onFail("Invalid credentials", "Check your mobile number or password");
            } else if (err?.response) {
                onFail(
                "Login Failed",
                err.response.data?.message || "Server error"
                );
            } else {
                onFail("Network Error", "Server not reachable");
            }
        }
        finally {
            setLoginLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">
        {/* MOBILE INPUT */}
        <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border border-gray-300"
        />

        {/* PASSWORD INPUT */}
        <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 rounded-lg bg-white border border-gray-300"
            />

            <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer"
        >
            Log In
        </button>

        {/* Reset Password */}
        <p className="text-center text-sm text-gray-500">
            Forgot your password?{" "}
            <span
            onClick={() => setShowResetPassword(true)}
            className="text-blue-600 cursor-pointer hover:underline"
            >
            Reset password
            </span>
        </p>

        {loginLoading && <LoginLoading />}

        {showResetPassword && (
            <FacultyResetPassword
            onClose={() => setShowResetPassword(false)}
            onSuccess={onSuccess}
            />
        )}
        </form>
    );
};

export default FacultyLoginSection;