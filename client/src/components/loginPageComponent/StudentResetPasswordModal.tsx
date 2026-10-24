import { useState } from "react";
import { AuthService } from "../../service/auth.service";
import { isValidRegisterNo } from "../../utils/validation";
import OtpLoading from "../loadingComponent/loginPageLoading/OtpLoading";

const StudentResetPasswordModal = ({
    onFail,
    onClose,
    getOtpModal
}: {
    onFail: (title: string, message: string) => void
    onClose: () => void
    getOtpModal: (no: string) => void
}) => {
    const [registerNo, setRegisterNo] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequestOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!isValidRegisterNo(registerNo.trim())) {
            onFail("Failed", "Enter a valid register number.");
            return;
        }
        try {
            setLoading(true);
            const response = await AuthService.requestPasswordReset({ registerNo: registerNo.trim(), role: 'STUDENT'});
            setLoading(false);
            if (response.status === 200) {
                getOtpModal(registerNo.trim());
            }
        }
        catch(err: any) {
            setLoading(false);
            onFail("Failed", err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn z-50" >
            <div
                className="relative w-[420px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-6 text-center border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <span
                onClick={onClose}
                className="absolute top-4 right-6 text-2xl text-gray-400 cursor-pointer hover:text-gray-700 transition"
                >
                &times;
                </span>

                <h2 className="text-2xl font-extrabold mb-2 tracking-wide text-gray-800">
                Reset Password
                </h2>

                <p className="text-sm mb-5 text-gray-500 text-center">
                Enter your register number to receive OTP
                </p>

                <input
                type="text"
                placeholder="Register Number"
                value={registerNo}
                onChange={(e) => {
                    setRegisterNo(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                />

                <div className="flex gap-4 mt-6">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    onClick={handleRequestOtp}
                    className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition cursor-pointer disabled:opacity-50"
                >
                    Send OTP
                </button>
                </div>
            </div>
            {
                loading && <OtpLoading />
            }
        </div>
    );
};

export default StudentResetPasswordModal;