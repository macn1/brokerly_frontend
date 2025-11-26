import React, { useState } from 'react';
import { useCreateLeadMutation } from '../../../store/api/bookings';
import { useGetAllaprtmentsNameQuery } from '../../../store/api/apartment';

const LeadModal = ({ apartment, isOpen, onClose, onNotification }) => {
    const [createLead, { isLoading }] = useCreateLeadMutation();
    const { data: aptData } = useGetAllaprtmentsNameQuery();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
        request_mode: "Offline",
        apartment: ""   // NEW FIELD
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.apartment) {
            alert("Please select an apartment");
            return;
        }

        const leadData = {
            ...formData,
            apartment: formData.apartment, // selected apartment ID
            user: null,
            request_status: "Requested"
        };

        try {
            await createLead(leadData).unwrap();
            onNotification("Lead request submitted successfully!.", "success");

            // Reset form
            setFormData({
                name: "",
                email: "",
                mobile: "",
                message: "",
                request_mode: "Offline",
                apartment: ""
            });

            onClose();
        } catch (error) {
            console.error('Submission error:', error);
            onNotification("Failed to submit lead request", "error");
        }
    };

    // Close modal if background clicked
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg w-full max-w-2xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Request Information
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                        disabled={isLoading}
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">

                    {/* Apartment Select Dropdown */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Apartment *
                        </label>

                        <select
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        >
                            <option value="">-- Select Apartment --</option>

                            {aptData?.map((apt) => (
                                <option key={apt.id} value={apt.id}>
                                    {apt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preferred Contact Mode
                                </label>
                                <div className="flex space-x-4 mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="request_mode"
                                            value="Online"
                                            checked={formData.request_mode === "Online"}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Online</span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="request_mode"
                                            value="Offline"
                                            checked={formData.request_mode === "Offline"}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">Offline</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message (Optional)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Any specific requirements or questions..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 border rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center"
                            >
                                {isLoading ? "Submitting..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeadModal;
