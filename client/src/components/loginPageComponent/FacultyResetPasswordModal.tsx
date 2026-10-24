import { useState } from "react";

const FacultyResetPasswordModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async () => {
    if (mobileNo.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // TODO: Replace with your API call
      // await authService.requestPasswordReset({ mobileNo, role: "FACULTY" });

      alert("OTP sent successfully");
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[420px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-6 text-center border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <span
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl text-gray-400 cursor-pointer hover:text-gray-700 transition"
        >
          &times;
        </span>

        {/* Title */}
        <h2 className="text-2xl font-extrabold mb-2 tracking-wide text-gray-800">
          Reset Password
        </h2>

        {/* NEW UI CONTENT */}
        <p className="text-sm mb-5 text-gray-500 text-center">
          Enter your mobile number to receive OTP
        </p>

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
            setMobileNo(val);
            setError("");
          }}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* Buttons */}
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
            className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyResetPasswordModal;