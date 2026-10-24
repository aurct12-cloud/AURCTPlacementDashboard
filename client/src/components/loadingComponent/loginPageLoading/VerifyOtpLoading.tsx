const VerifyOtpLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white px-10 py-8 rounded-2xl shadow-2xl flex flex-col items-center border border-blue-100">

        {/* DNA Loader */}
        <div className="relative h-20 w-20 flex items-center justify-center">

          <div className="absolute w-16 h-16 border-4 border-blue-200 rounded-full"></div>

          <div className="absolute w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

          <div className="absolute flex gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>

            <span
              className="w-3 h-3 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>

            <span
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          Verifying OTP
        </h2>

        <p className="mt-2 text-sm text-gray-500 text-center max-w-[250px]">
          Please wait while we securely verify your OTP
        </p>

        {/* Animated Loading Bar */}
        <div className="w-56 h-2 bg-blue-100 rounded-full overflow-hidden mt-6">
          <div className="h-full w-1/2 bg-blue-600 rounded-full animate-[loading_1.2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default VerifyOtpLoading;