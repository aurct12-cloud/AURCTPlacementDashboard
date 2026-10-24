import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetPasswordForm = ({ onClose }: { onClose?: () => void }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [strengthError, setStrengthError] = useState("");
  const [mismatchError, setMismatchError] = useState("");
  const [emptyError, setEmptyError] = useState({
    new: "",
    confirm: "",
  });

  const togglePassword = (field: "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    setStrengthError("");
    setMismatchError("");
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
    setEmptyError({ new: "", confirm: "" });

    if (!formData.newPassword) {
      setEmptyError((p) => ({ ...p, new: "Enter new password" }));
    }

    if (!formData.confirmPassword) {
      setEmptyError((p) => ({ ...p, confirm: "Enter confirm password" }));
    }

    if (!isStrongPassword(formData.newPassword)) {
      setStrengthError(
        "Use 8+ chars with uppercase, lowercase, number & special character."
      );
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMismatchError("Passwords do not match.");
      return;
    }

    // success
    setTimeout(() => {
      onClose?.();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 p-8"
      >

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Set Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a strong password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                id="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {emptyError.new && (
              <p className="text-red-500 text-sm mt-1">
                {emptyError.new}
              </p>
            )}

            {strengthError && (
              <p className="text-red-500 text-sm mt-1">
                {strengthError}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {emptyError.confirm && (
              <p className="text-red-500 text-sm mt-1">
                {emptyError.confirm}
              </p>
            )}

            {mismatchError && (
              <p className="text-red-500 text-sm mt-1">
                {mismatchError}
              </p>
            )}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Close */}
        

      </div>
    </div>
  );
};

export default SetPasswordForm;