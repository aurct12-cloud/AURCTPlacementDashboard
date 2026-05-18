import { useState } from "react";
import { Link } from "react-router-dom";
import collegeLogo from "../../assets/mainImage/college-logo.jpeg";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordResetPage() {
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [strengthError, setStrengthError] = useState<string>("");
  const [mismatchError, setMismatchError] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const togglePassword = (field: "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isStrongPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStrengthError("");
    setMismatchError("");

    if (!formData.newPassword) {
      setNewPassword("Enter the new password");
    } else {
      setNewPassword("");
    }

    if (!formData.confirmPassword) {
      setConfirmPassword("Enter the confirm password");
    } else {
      setConfirmPassword("");
    }

    if (
      !isStrongPassword(formData.newPassword) &&
      formData.newPassword.length > 0
    ) {
      setStrengthError(
        "Use at least 8 characters, including uppercase, lowercase, number, and a special symbol."
      );
      return;
    }

    if (
      formData.newPassword !== formData.confirmPassword &&
      formData.confirmPassword.length > 0
    ) {
      setMismatchError("Passwords do not match. Please try again.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-8"
      >

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={collegeLogo}
            alt="logo"
            className="w-20 h-20 mx-auto rounded-2xl shadow-md border border-gray-200"
          />

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            AURCT Placement Dashboard
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 transition-all"
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword.new ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            {newPassword && (
              <p className="text-red-500 text-sm mt-2">
                {newPassword}
              </p>
            )}

            {strengthError && (
              <p className="text-red-500 text-sm mt-2">
                {strengthError}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 transition-all"
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword.confirm ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            {confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {confirmPassword}
              </p>
            )}

            {mismatchError && (
              <p className="text-red-500 text-sm mt-2">
                {mismatchError}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link
            to="/auth"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}