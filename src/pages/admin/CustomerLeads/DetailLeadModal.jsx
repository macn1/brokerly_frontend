import React from "react";

export default function MemberModalRTK({ isOpen, onClose, data }) {

    if (!isOpen || !data) return null;

    const member = data;              // All main fields
    const visits = data.visits || []; // Visit history array

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Lead Details</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        View complete lead information
                    </p>
                </div>

                <div className="p-6 space-y-6">

                    {/* Row 1 - Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                {member.name}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                {member.email}
                            </div>
                        </div>
                    </div>

                    {/* Row 2 - Phone & Request Mode */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                {member.mobile}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Request Mode
                            </label>
                            <div className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-800">
                                {member.request_mode}
                            </div>
                        </div>
                    </div>

                    {/* Row 3 - Apartment Name & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apartment Name
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                {member.apartment_name || "N/A"}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apartment Price
                            </label>
                            <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                                ₹ {member.apartment_price || "0"}
                            </div>
                        </div>
                    </div>

                    {/* Request Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Request Status
                        </label>
                        <div className="border border-green-200 rounded-lg px-3 py-2 bg-green-50 text-green-800">
                            {member.request_status}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                            {member.message || "N/A"}
                        </div>
                    </div>

                    {/* Created Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Created On
                        </label>
                        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                            {new Date(member.created).toLocaleString()}
                        </div>
                    </div>

                    {/* Visit History */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Visit History
                        </h3>

                        {visits.length === 0 ? (
                            <p className="text-gray-500">No visit entries.</p>
                        ) : (
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Date
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Paid
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Pending
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Remarks
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {visits.map((v) => (
                                            <tr key={v.id}>
                                                <td className="px-4 py-2">
                                                    {new Date(v.visit_date).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2">{v.status}</td>
                                                <td className="px-4 py-2">₹ {v.amount_paid}</td>
                                                <td className="px-4 py-2">₹ {v.pending_amount}</td>
                                                <td className="px-4 py-2">{v.remarks || "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
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
