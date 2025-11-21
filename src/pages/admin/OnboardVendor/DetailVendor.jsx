import React from "react";
import { useGetVendorByidQuery } from '../../../store/api/vendor';

export default function VendorModalRTK({ 
    isOpen, 
    onClose, 
    vendorId // Required for detail mode
}) {
    // Fetch vendor data for detail mode
    const { 
        data: vendorData, 
        isLoading: isLoadingVendor, 
        error: vendorError 
    } = useGetVendorByidQuery(vendorId, {
        skip: !vendorId,
    });

    if (!isOpen) return null;

    const vendor = vendorData?.data || vendorData;
    console.log(vendor,"vendor Detail data");

    // Construct full image URLs (adjust the base URL as needed)
    const baseUrl = "http://localhost:8000/media"; // Change this to your backend URL
    const faviconUrl = vendor?.favicon ? `${baseUrl}/${vendor.favicon}` : null;
    const logoUrl = vendor?.logo ? `${baseUrl}/${vendor.logo}` : null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Vendor Details</h2>
                    <p className="text-gray-600 text-sm mt-1">View vendor information and details</p>
                </div>

                {/* Loading State */}
                {isLoadingVendor && (
                    <div className="p-6 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2">Loading vendor details...</span>
                    </div>
                )}

                {/* Error State */}
                {vendorError && (
                    <div className="p-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">
                                Failed to load vendor details: {vendorError.data?.message || "Unknown error"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Vendor Details */}
                {vendor && !isLoadingVendor && (
                    <div className="p-6 space-y-6">
                        {/* First Row - Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vendor Name
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {vendor.name || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {vendor.email || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Second Row - Phone & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {vendor.phone_number || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vendor Status
                                </label>
                                <div className={`border rounded-lg px-3 py-2 w-full ${
                                    vendor.vendor_status === "Approved" 
                                        ? "bg-green-50 border-green-200 text-green-800" 
                                        : vendor.vendor_status === "Pending"
                                        ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                }`}>
                                    {vendor.vendor_status || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Third Row - Address & Domain Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {vendor.vendor_address || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain Name
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {vendor.domain || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Fourth Row - Domain Favicon & Logo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain Favicon
                                </label>
                                <div className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 min-h-[80px]">
                                    {faviconUrl ? (
                                        <div className="flex flex-col items-center space-y-2">
                                            <img 
                                                src={faviconUrl} 
                                                alt="Favicon" 
                                                className="w-8 h-8 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <div className="text-sm text-gray-600 text-center">
                                                Favicon uploaded
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {vendor.favicon}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 py-2">
                                            No favicon uploaded
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain Logo
                                </label>
                                <div className="border border-gray-300 rounded-lg p-3 w-full bg-gray-50 min-h-[80px]">
                                    {logoUrl ? (
                                        <div className="flex flex-col items-center space-y-2">
                                            <img 
                                                src={logoUrl} 
                                                alt="Logo" 
                                                className="w-16 h-16 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <div className="text-sm text-gray-600 text-center">
                                                Logo uploaded
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {vendor.logo}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 py-2">
                                            No logo uploaded
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional vendor information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created Date
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                {vendor.created_at ? new Date(vendor.created_at).toLocaleDateString() : "N/A"}
                            </div>
                        </div>

                        {/* Vendor ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vendor ID
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                {vendor.id || "N/A"}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-[#3e3e45] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2e2e33] transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}