import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import sadStudent from "../../assets/images/sad-student.jpg";

const NotFoundPage = () => {
  return (
    <div className="relative flex items-center justify-center w-[100dvw] h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-blue-300/30 blur-3xl rounded-full" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-blue-400/20 blur-3xl rounded-full" />

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-14 h-14 rounded-2xl bg-blue-200/40 backdrop-blur-md"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 right-20 w-20 h-20 rounded-full bg-blue-300/30 backdrop-blur-md"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-16 max-w-6xl w-full"
      >

        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 flex-1">

          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shadow-sm"
          >
            <Sparkles size={16} />
            Oops! Something went wrong
          </motion.div>

          {/* 404 */}
          <motion.h1
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-7xl md:text-[140px] font-black leading-none bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm"
          >
            404
          </motion.h1>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Lost in the Dashboard?
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed">
            The page you're searching for might have been moved, deleted,
            or never existed in the AURCT Placement Portal.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="group flex items-center gap-2 px-7 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-xl shadow-blue-300/40 hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Dashboard
            </motion.button>

          </div>
        </div>

        {/* Right Section */}
        <motion.div
          animate={{
            y: [0, -14, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex justify-center flex-1"
        >

          {/* Glow Behind Image */}
          <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] bg-blue-300/20 blur-3xl rounded-full" />

          <img
            src={sadStudent}
            alt="Sad Student Illustration"
            className="relative z-10 w-64 md:w-[480px] object-contain drop-shadow-2xl"
          />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default NotFoundPage;