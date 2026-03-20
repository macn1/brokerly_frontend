import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
import { useGetAllcustomerVendorBookingsQuery, useDeleteApartmentLeadsMutation, useGetAllcustomerBookingsQuery } from '../../../store/api/bookings'
import ConfirmDeleteModal from "../common/DeleteModal";
import SuccessModal from "../common/Successmodal";
import { useSelector } from "react-redux";

const BookingList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteLeads] = useDeleteApartmentLeadsMutation();

    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);
    const [message, setSuccessMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const role = useSelector((state) => state.user.role);

    const adminQuery = useGetAllcustomerBookingsQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Admin" }
    );

    const vendorQuery = useGetAllcustomerVendorBookingsQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Vendor" }
    );

    const bookingsData = role === "Admin" ? adminQuery.data : vendorQuery.data;
    const refetch = role === "Admin" ? adminQuery.refetch : vendorQuery.refetch;

    useEffect(() => {
        if (bookingsData) {
            setTableData(bookingsData.results);
            setCount(bookingsData.count);
        }
    }, [bookingsData]);

    const handleNotification = (message, type = "success") => {
        setSuccessMessage(message);
        setMessageType(type);
    };

    // Status badge color helper
    const getStatusStyle = (status) => {
        const styles = {
            Requested:  "bg-yellow-100 text-yellow-700",
            Approved:   "bg-blue-100 text-blue-700",
            Holding:    "bg-gray-100 text-gray-600",
            Rejected:   "bg-red-100 text-red-600",
            Booked:     "bg-green-100 text-green-700",
            Paid:       "bg-emerald-100 text-emerald-700",
        };
        return styles[status] || "bg-gray-100 text-gray-600";
    };

    const tableHeaders = [
        {
            label: "Apartment",
            key: "apartment_name",
            formatter: (value) => (
                <span className="font-medium text-gray-800">{value || "—"}</span>
            ),
        },
        {
            label: "Customer",
            key: "customer_name",
            formatter: (value, row) => (
                <div>
                    <p className="font-medium text-gray-800">{value}</p>
                    <p className="text-xs text-gray-400">{row.mobile}</p>
                </div>
            ),
        },
        {
            label: "Status",
            key: "visit_status",
            formatter: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(value)}`}>
                    {value}
                </span>
            ),
        },
        {
            label: "Mode",
            key: "request_mode",
            formatter: (value) => (
                <span className="text-xs text-gray-500">{value}</span>
            ),
        },
        {
            label: "Paid Amount",
            key: "amount_paid",
            formatter: (value) => (
                <span className="text-green-600 font-medium">₹ {value || "0.00"}</span>
            ),
        },
        {
            label: "Pending Amount",
            key: "pending_amount",
            formatter: (value) => (
                <span className="text-red-500 font-medium">₹ {value || "0.00"}</span>
            ),
        },
        {
            label: "Date",
            key: "created",
            formatter: (value) => (
                <span className="text-xs text-gray-400">
                    {new Date(value).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            ),
        },
    ];

    const actionButtons = [
        {
            icon: "MdOutlineRemoveRedEye",
            onClick: (row) => {
                console.log("View booking", row);
                // open detail modal here when ready
            },
        },
        {
            icon: "RiDeleteBinLine",
            onClick: (row) => {
                setSelectedBooking(row);
                setDeleteModalOpen(true);
            },
        },
    ];

    const handleConfirmDelete = async () => {
        if (!selectedBooking) return;
        setIsDeleting(true);
        try {
            await deleteLeads(selectedBooking.id).unwrap();
            setDeleteModalOpen(false);
            setSelectedBooking(null);
            refetch();
            handleNotification("Booking deleted successfully");
        } catch (error) {
            console.error("Delete failed:", error);
            handleNotification("Failed to delete booking", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <ListLayout
                title="Bookings"
                tableHeaders={tableHeaders}
                tableData={tableData}
                actionButtons={actionButtons}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalCount={count}
            />

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedBooking?.customer_name}
                isDeleting={isDeleting}
            />

            <SuccessModal
                message={message}
                type={messageType}
                onClose={() => setSuccessMessage("")}
            />
        </>
    );
};

export default BookingList;