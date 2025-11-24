import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
// import AmenityCreateModal from "./CreateAmenityModal";
import { useGetAllcustomerVendorLeadsQuery, useDeleteApartmentLeadsMutation, useGetAllcustomerLeadsQuery } from '../../../store/api/bookings'
import ConfirmDeleteModal from "../common/DeleteModal";
// import UpdateModal from './UpdateModal'
import { useSelector } from "react-redux";

import SuccessModal from "../common/Successmodal";
const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteLeads] = useDeleteApartmentLeadsMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);
    const [message, setSuccessMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectAmenity, setSelectAmenity] = useState(null)
    const role = useSelector((state) => state.user.role);

    const [isupdateModalopen, setIsupdateModalOpen] = useState(false)
    // const [apartmentId, setAparmentId] = useState(null)
    const [apartmentId, setApartmentId] = useState(null)
    console.log(role, "sssssssssssssss");

    //    const role = useSelector((state) => state.user.role);

    const adminQuery = useGetAllcustomerLeadsQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Admin" }
    );

    const vendorQuery = useGetAllcustomerVendorLeadsQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Vendor" }
    );

    // dynamic data based on user role
    const LeadsData = role === "Admin"
        ? adminQuery.data
        : vendorQuery.data;

    const refetch = role === "Admin"
        ? adminQuery.refetch
        : vendorQuery.refetch;



    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (LeadsData) {
            setTableData(LeadsData.results)
            setCount(LeadsData.count)
        }

    }, [LeadsData])

    const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");

    const handleNotification = (message, type = "success") => {
        setSuccessMessage(message);
        setMessageType(type);
    };

    const tableHeaders = [
        { label: "Name", key: "name" },
        { label: "Phone", key: "mobile" },

        { label: "message", key: "message" },
        { label: "Requested_Mode", key: "request_mode" },



    ];


    const actionButtons = [
        // {
        //     icon: "MdOutlineRemoveRedEye",
        //     onClick: (row) => console.log(`View ${row.id}`),
        // },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => {
                console.log(`View ${row.id}`)
                setApartmentId(row.id)
                setIsupdateModalOpen(true)
            },
        },
        {
            icon: "RiDeleteBinLine",
            onClick: (row) => {
                setSelectAmenity(row)
                setDeleteModalOpen(true)

            }
        }
    ];
    const handleConfirmDelete = async () => {
        if (!selectAmenity) return;
        setIsDeleting(true);
        try {
            await deleteLeads(selectAmenity.id).unwrap();
            setDeleteModalOpen(false);
            setSelectAmenity(null);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete Amenity.");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <>
            <ListLayout
                title="Staff List"
                tableHeaders={tableHeaders}
                tableData={tableData}
                actionButtons={actionButtons}
                currentPage={currentPage}
                onAddNewButton={() => setIsModalOpen(true)}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalCount={count}
            />
            {/* <AmenityCreateModal
                    isOpen={isModalOpen}
                        onNotification={handleNotification}
                    onClose={() => {
                        setIsModalOpen(false);
                        refetch(); // refresh list after modal is closed
                    }}
                /> */}
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectAmenity?.name}
                isDeleting={isDeleting}
            />
            {/* <UpdateModal
                    isOpen={isupdateModalopen}
                    ApartmentId={apartmentId}
                    onNotification={handleNotification}
                    onClose={() => { setIsupdateModalOpen(false) }}
                /> */}
            <SuccessModal
                message={message}
                type={messageType}
                onClose={() => setSuccessMessage("")}
            />

        </>
    );
};

export default List;
