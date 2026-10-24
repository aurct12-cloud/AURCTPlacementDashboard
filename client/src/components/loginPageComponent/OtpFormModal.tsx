import { useRef, useState } from "react";
import type {
    ClipboardEvent,
    KeyboardEvent,
    ChangeEvent,
} from "react";
import emailSecurityIcon from "../../assets/loginPageImage/protection.png";
import VerifyOtpLoading from "../loadingComponent/loginPageLoading/VerifyOtpLoading";
import { AuthService } from "../../service/auth.service";

const OtpFormModal = ({
    no,
    role,
    onFail,
    onClose,
    changePassword,
}: {
    no: string;
    role: string
    onFail: (title: string, message: string) => void;
    onClose: () => void;
    changePassword: (token: string) => void;
}) => {
    const length = 6;
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length)
        .split("");

        const updatedOtp = Array(length).fill("");

        pasted.forEach((char, i) => {
        updatedOtp[i] = char;
        });

        setOtp(updatedOtp);

        inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
    };

    const handleVerify = async () => {
        const code = otp.join("");

        if (code.length !== length) {
            onFail('Failed', "Please enter complete OTP");
            return;
        }

        try {
            setLoading(true);
            let payload: {
                role: "STUDENT" | "FACULTY" | "ADMIN";
                otp: string;
                registerNo?: string;
                mobileNo?: string;
            } = {
                role: role == 'FACULTY' ? 'FACULTY' : role == 'ADMIN' ? 'ADMIN' : 'STUDENT',
                otp: code,
            };

            if (role === "STUDENT") {
                payload.registerNo = no;
            }
            else {
                payload.mobileNo = no;
            }

            const response = await AuthService.verifyOtp(payload);

            if(response.status === 200) {
                //   START FROM HERE
            }
        }
        catch {
            onFail('Failed', "Invalid OTP. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    const isComplete = otp.every((d) => d !== "");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-[92vw] md:w-[420px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-5">

            {/* Icon */}
            <img src={emailSecurityIcon} alt="security icon" className="w-16 h-16" />

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-800">
                Email Verification
            </h1>

            {/* Description */}
            <p className="text-center text-sm text-gray-500">
                Enter the 6-digit OTP sent to your email. It is valid for 5 minutes.
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
                <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                    inputsRef.current[index] = el;
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-11 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                />
            ))}
            </div>

            {/* Verify Button */}
            <button onClick={handleVerify} disabled={!isComplete || loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-lg transition flex justify-center items-center" >
                Verify OTP
            </button>

            {/* Resend */}
            {/* <p className="text-sm text-gray-600">
            Didn't receive OTP?{" "}
            <span
                onClick={onResend}
                className="text-blue-600 font-medium underline underline-offset-2 cursor-pointer"
            >
                Resend
            </span>
            </p> */}
        </div>
        {
            loading && <VerifyOtpLoading />
        }
        </div>
    );
};

export default OtpFormModal;