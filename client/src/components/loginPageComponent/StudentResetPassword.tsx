import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "../../service/auth.service";
import ResetLinkLoading from "../loadingComponent/loginPageLoading/ResetLinkLoading";
import VerifyOtpLoading from "../loadingComponent/loginPageLoading/VerifyOtpLoading";

type Props = {
  onClose: () => void;
  onSuccess: (title: string, message: string) => void;
  onFail?: (title: string, message: string) => void;
};

type Step = "email" | "otp" | "password";

const StudentResetPassword: React.FC<Props> = ({
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<Step>("email");

  const [registerNo, setRegisterNo] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Request OTP
  const handleRequestOtp = async () => {
    if (!registerNo.trim()) {
      setError("Please enter your register number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authService.requestPasswordReset({
        registerNo: registerNo.trim(),
        role: "STUDENT",
      });

      if (response.data.status === "SUCCESS") {
        setEmail(response.data.data.email);
        setStep("otp");

        onSuccess(
          "OTP Sent",
          "Please check your email for the OTP"
        );
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authService.verifyOtp({
        registerNo: registerNo.trim(),
        role: "STUDENT",
        otp: otp.trim(),
      });

      if (response.data.status === "SUCCESS") {
        setStep("password");
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authService.resetPassword(password);

      if (response.data.status === "SUCCESS") {
        onSuccess(
          "Password Reset",
          "Your password has been reset successfully."
        );

        onClose();
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
      >


        <div className="p-7">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-700 transition cursor-pointer"
          >
            &times;
          </button>

          {/* Header */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-gray-800">
              Reset Password
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Secure your student account
            </p>
          </div>

          {/* STEP 1 */}
          {step === "email" && (
            <>
              <p className="text-sm mb-5 text-gray-500 text-center">
                Enter your register number to receive OTP
              </p>

              <input
                type="text"
                placeholder="Register Number"
                value={registerNo}
                onChange={(e) => {
                  setRegisterNo(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />

              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  {error}
                </p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRequestOtp}
                  disabled={loading}
                  className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === "otp" && (
            <>
              <p className="text-sm text-gray-500 text-center mb-1">
                Enter the OTP sent to
              </p>

              <p className="text-sm font-medium text-blue-600 text-center mb-5">
                {email}
              </p>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  setOtp(val);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition-all
                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-center text-lg tracking-[0.3em]"
              />

              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  {error}
                </p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError("");
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                  Back
                </button>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === "password" && (
            <>
              <p className="text-sm text-gray-500 text-center mb-5">
                Create your new password
              </p>

              {/* New Password */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 outline-none transition-all
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 outline-none transition-all
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Password must contain at least 8 characters
              </p>

              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  {error}
                </p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setStep("otp");
                    setPassword("");
                    setConfirmPassword("");
                    setError("");
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                  Back
                </button>

                <button
                  onClick={handleResetPassword}
                  disabled={
                    loading ||
                    !password ||
                    !confirmPassword
                  }
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Resetting..." : "Reset"}
                </button>
              </div>
            </>
          )}

          {/* Loaders */}
          {loading && step === "email" && (
            <ResetLinkLoading />
          )}

          {loading &&
            (step === "otp" || step === "password") && (
              <VerifyOtpLoading />
            )}
        </div>
      </div>
    </div>
  );
};

export default StudentResetPassword;