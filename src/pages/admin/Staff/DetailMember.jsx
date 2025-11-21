import React from "react";
import { useGetMemberbyIdQuery } from '../../../store/api/vendor'; // Adjust the import path

export default function MemberModalRTK({ 
    isOpen, 
    onClose, 
    vendorId // Required for detail mode
}) {
    // Fetch member data for detail mode
    const { 
        data: memberData, 
        isLoading: isLoadingMember, 
        error: memberError 
    } = useGetMemberbyIdQuery(vendorId, {
        skip: !vendorId,
    });

    if (!isOpen) return null;

    const member = memberData?.data || memberData;
    console.log(member, "Member Detail data");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Member Details</h2>
                    <p className="text-gray-600 text-sm mt-1">View member information and details</p>
                </div>

                {/* Loading State */}
                {isLoadingMember && (
                    <div className="p-6 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2">Loading member details...</span>
                    </div>
                )}

                {/* Error State */}
                {memberError && (
                    <div className="p-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">
                                Failed to load member details: {memberError.data?.message || "Unknown error"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Member Details */}
                {member && !isLoadingMember && (
                    <div className="p-6 space-y-6">
                        {/* First Row - Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Member Name
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {member.name || member.user?.name || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {member.email || member.user?.email || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Second Row - Phone & Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                    {member.phone_number || member.user?.phone_number || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <div className="border border-blue-200 rounded-lg px-3 py-2 w-full bg-blue-50 text-blue-800">
                                    {member.role || member.user?.role || "Member"}
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Designation
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                {member.designation || member.member_profile?.designation || "N/A"}
                            </div>
                        </div>
                        {/* Member ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Member ID
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                                {member.id || member.user?.id || "N/A"}
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