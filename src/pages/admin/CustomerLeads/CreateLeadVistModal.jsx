import React, { useState, useEffect } from "react";
import { useCreateLeadVisitMutation } from "../../../store/api/bookings";
import { useGetAllMemberNameQuery } from "../../../store/api/vendor";

const LeadVisitModal = ({ isOpen, onClose, onNotification, data }) => {
    const [createLeadVisit, { isLoading }] = useCreateLeadVisitMutation();
    const { data: membersList, isLoading: membersLoading } = useGetAllMemberNameQuery();

    const VISIT_STATUS_CHOICES = [
        "Interested",
        "Rejected",
        "Holding",
        "Booked",
        "Paid",
    ];

    const apartmentPrice = Number(data?.apartment_price || 0);

    const lastPendingAmount =
        data?.visits?.length > 0
            ? Number(data.visits[data.visits.length - 1].pending_amount)
            : apartmentPrice;

    const [formData, setFormData] = useState({
        status: "Interested",
        amount_paid: "",
        pending_amount: lastPendingAmount,
        remarks: "",
    });

    const [staffId, setStaffId] = useState("");

    useEffect(() => {
        const paid = Number(formData.amount_paid || 0);
        const pending = lastPendingAmount - paid;

        setFormData((prev) => ({
            ...prev,
            pending_amount: pending >= 0 ? pending : 0,
        }));
    }, [formData.amount_paid, lastPendingAmount]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            lead: data.id,
            status: formData.status,
            amount_paid: Number(formData.amount_paid || 0),
            pending_amount: Number(formData.pending_amount || 0),
            remarks: formData.remarks,
            vendor_name: staffId || data.vendor_name || null, // staff id passed
        };

        try {
            await createLeadVisit(payload).unwrap();
            onNotification("Lead visit created successfully!", "success");

            setFormData({
                status: "Interested",
                amount_paid: "",
                pending_amount: lastPendingAmount,
                remarks: "",
            });

            setStaffId("");
            onClose();
        } catch (err) {
            onNotification("Failed to create lead visit", "error");
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
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
                        Add Lead Visit
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                value={data?.name || ""}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apartment Name
                            </label>
                            <input
                                type="text"
                                value={data?.apartment_name || ""}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Apartment Price
                            </label>
                            <input
                                type="number"
                                value={data?.apartment_price || ""}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pending Amount (Auto)
                            </label>
                            <input
                                type="number"
                                value={formData.pending_amount}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        {/* Staff / Vendor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Staff Name
                            </label>

                            {data?.vendor_name ? (
                                <input
                                    type="text"
                                    value={data.vendor_name}
                                    readOnly
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                />
                            ) : (
                                <select
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={staffId}
                                    disabled={membersLoading}
                                    onChange={(e) => setStaffId(e.target.value)}
                                >
                                    <option value="">Select Staff</option>
                                    {membersList?.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Visit Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    {VISIT_STATUS_CHOICES.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Amount Paid
                                </label>
                                <input
                                    type="number"
                                    name="amount_paid"
                                    value={formData.amount_paid}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Remarks (Optional)
                            </label>
                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                rows="4"
                                disabled={isLoading}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Write remarks..."
                            />
                        </div>

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
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                {isLoading ? "Saving..." : "Save Visit"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default LeadVisitModal;
