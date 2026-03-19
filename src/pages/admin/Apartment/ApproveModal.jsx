import { useState, useEffect } from "react";
import { useUpdateApartmentStatusMutation } from "../../../store/api/apartment";

const APARTMENT_STATUS_CHOICES = [
    "Pending",
    "Approved", 
    "Rejected",
];

const STATUS_CONFIG = {
    Pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending Review" },
    Approved: { color: "bg-green-100 text-green-800 border-green-200", label: "Approved" },
    Rejected: { color: "bg-red-100 text-red-800 border-red-200", label: "Rejected" },
};

const ApproveProjectModal = ({ isOpen, onClose, row, onSuccess }) => {
    const [status, setStatus] = useState("Pending");
    const [updateApartmentStatus, { isLoading }] = useUpdateApartmentStatusMutation();

    useEffect(() => {
        if (row?.status) {
            setStatus(row.status);
        }
    }, [row]);

    const handleSubmit = async () => {
        const payload = {
            id: row?.id,
            data: { status },
        };

        try {
            const response = await updateApartmentStatus(payload).unwrap();
            console.log("Status Updated Successfully:", response);

            if (onSuccess) onSuccess(response);
            onClose();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (!isOpen) return null;

    const currentStatusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Project Approval</h2>
                            <p className="text-gray-500 text-sm mt-1">Update project status</p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-light hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#3e3e45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Project Name</h3>
                                <p className="text-lg font-semibold text-[#3e3e45] mt-1">{row?.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Project Status
                        </label>
                        
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-[#3e3e45] focus:border-[#3e3e45] transition duration-200 appearance-none cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={isLoading}
                        >
                            {APARTMENT_STATUS_CHOICES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center justify-between p-3 border-2 rounded-lg border-dashed border-gray-200 bg-gray-50">
                            <span className="text-sm font-medium text-gray-600">New Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${currentStatusConfig.color}`}>
                                {currentStatusConfig.label}
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Status Meaning:</h4>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p>• <span className="font-medium">Pending:</span> Under review and evaluation</p>
                            <p>• <span className="font-medium">Approved:</span> Project is approved and active</p>
                            <p>• <span className="font-medium">Rejected:</span> Project is declined</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-[#3e3e45] text-white rounded-lg font-medium hover:bg-[#2e2e33] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3e3e45] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <span>Update Status</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproveProjectModal;