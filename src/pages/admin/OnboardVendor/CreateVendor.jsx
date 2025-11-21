import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterVendorMutation } from '../../../store/api/vendor'

export default function VendorModalRTK({ isOpen, onClose, onNotification }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [createVendor, { isLoading }] = useRegisterVendorMutation();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone_number", data.phone_number);
            formData.append("password", data.password);
            formData.append("address", data.address);
            formData.append("domain_name", data.domain_name);
            formData.append("vendor_status", "Approved");


            // Append files if they exist
            if (data.domain_favicon && data.domain_favicon[0]) {
                formData.append("domain_favicon", data.domain_favicon[0]);
            }
            if (data.domain_logo && data.domain_logo[0]) {
                formData.append("domain_logo", data.domain_logo[0]);
            }

            await createVendor(formData).unwrap();

            reset();
            onClose();
            onNotification("Vendor created successfully.", "success");
        } catch (error) {
            console.error("Failed to create vendor:", error);
            onNotification(`Failed to create vendor: ${error.data?.message || error.message || "Unknown error"}`, "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Register New Vendor</h2>
                    <p className="text-gray-600 text-sm mt-1">Complete the vendor registration form below</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* First Row - Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vendor Name *
                            </label>
                            <input
                                {...register("name", { required: "Vendor name is required" })}
                                placeholder="Enter vendor name"
                                className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                                placeholder="vendor@example.com"
                                type="email"
                                className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Second Row - Phone & Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                {...register("phone_number")}
                                placeholder="+1 (555) 123-4567"
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password *
                            </label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                placeholder="Enter secure password"
                                type="password"
                                className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Third Row - Address & Domain Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address *
                            </label>
                            <input
                                {...register("address", { required: "Address is required" })}
                                placeholder="Enter complete address"
                                className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Domain Name *
                            </label>
                            <input
                                {...register("domain_name", { required: "Domain name is required" })}
                                placeholder="example.com"
                                className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.domain_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.domain_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.domain_name.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Fourth Row - Domain Favicon & Logo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Domain Favicon
                            </label>
                            <input
                                {...register("domain_favicon")}
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#3e3e45] hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">Recommended: 32x32 px .ico or .png</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Domain Logo
                            </label>
                            <input
                                {...register("domain_logo")}
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#3e3e45] hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">Recommended: Logo image file</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-[#3e3e45] text-white px-6 py-3 rounded-lg font-medium disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering Vendor...
                                </>
                            ) : (
                                "Register Vendor"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}