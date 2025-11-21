import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, isDeleting }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm  z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-yellow-50 rounded-lg p-6 w-96"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p className="mb-6">Are you sure you want to delete <strong>{itemName}</strong>?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={onClose}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded text-white ${isDeleting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
                                onClick={onConfirm}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDeleteModal;