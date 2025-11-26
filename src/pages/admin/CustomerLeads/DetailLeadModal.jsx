import React from "react";

export default function MemberModalRTK({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    const member = data;
    const visits = data.visits || [];
    const lastPending = visits[visits.length - 1].pending_amount;
console.log(lastPending);

    
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Lead Information</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Comprehensive details and visit history
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-light"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 space-y-8">
                        
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">
                                Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900 font-medium">{member.name}</span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900">{member.email}</span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900">{member.mobile}</span>
                                    </div>
                                </div>

                                {/* Request Mode */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Request Mode
                                    </label>
                                    <div className="border border-blue-100 rounded-lg px-4 py-3 bg-blue-50 shadow-sm">
                                        <span className="text-blue-700 font-medium">{member.request_mode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-green-500 pl-3">
                                Property Information
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Apartment Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Apartment Name
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900">{member.apartment_name || "Not specified"}</span>
                                    </div>
                                </div>

                                {/* Apartment Price */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Apartment Price
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900 font-medium">
                                            ₹{member.apartment_price ? member.apartment_price.toLocaleString() : "0"}
                                        </span>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Amount Paid
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900 font-medium">
                                            ₹{member.apartment_price-lastPending}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Details Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-purple-500 pl-3">
                                Additional Details
                            </h3>
                            
                            <div className="space-y-6">
                                {/* Staff Name */}
                                {member.vendor_name && (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Assigned Staff
                                        </label>
                                        <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                            <span className="text-gray-900">{member.vendor_name}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Request Status */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Request Status
                                    </label>
                                    <div className="border border-green-100 rounded-lg px-4 py-3 bg-green-50 shadow-sm">
                                        <span className="text-green-700 font-medium">{member.request_status}</span>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Customer Message
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm min-h-[80px]">
                                        <p className="text-gray-900 whitespace-pre-wrap">
                                            {member.message || "No message provided"}
                                        </p>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Created Date
                                    </label>
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm">
                                        <span className="text-gray-900">
                                            {new Date(member.created).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visit History Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">
                                Visit History
                            </h3>

                            {visits.length === 0 ? (
                                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                    <p className="text-gray-500 text-lg">No visit records found</p>
                                    <p className="text-gray-400 text-sm mt-1">Visit history will appear here once recorded</p>
                                </div>
                            ) : (
                                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Visit Date
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Amount Paid
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Pending Amount
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Remarks
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {visits.map((visit) => (
                                                    <tr key={visit.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {new Date(visit.visit_date).toLocaleString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {visit.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                            ₹{visit.amount_paid.toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                                                            ₹{visit.pending_amount.toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                                            <p className="truncate" title={visit.remarks}>
                                                                {visit.remarks || "—"}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}