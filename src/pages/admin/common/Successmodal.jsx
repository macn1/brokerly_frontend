import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const SuccessModal = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="fixed inset-0 z-[9999] flex justify-center items-start mt-10"
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg text-white font-medium
              ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {type === "success" ? (
              <IoCheckmarkCircle className="text-2xl" />
            ) : (
              <IoCloseCircle className="text-2xl" />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
