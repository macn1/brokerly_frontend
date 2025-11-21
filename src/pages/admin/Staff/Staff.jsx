import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";

import { useGetAllMemberListQuery, useDeleteVendorMutation, useGetVendorByidQuery } from '../../../store/api/vendor'
import ConfirmDeleteModal from "../common/DeleteModal";
import CreateStaff from './CreateStaff'
import SuccessModal from "../common/Successmodal";
import DetailMember from './DetailMember'

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteVendor] = useDeleteVendorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);
    const [message, setSuccessMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectVendor, setSelectVendor] = useState(null)
    const [vendorId,setSelectVendorId] = useState(null)
    const [isDetailModal, setIsDetailModal] = useState(false)

    console.log(isModalOpen, "sssssssssssssss");

    const { data: MemberList, refetch } = useGetAllMemberListQuery({
        page: currentPage,
        page_size: pageSize,
        ...filters,
    });


    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (MemberList) {
            setTableData(MemberList.results)
            setCount(MemberList.count)
        }

    }, [MemberList])

    const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");

    const handleNotification = (message, type = "success") => {
        setSuccessMessage(message);
        setMessageType(type);
    };

    const tableHeaders = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Designation", key: "designation" },
    ];


    const actionButtons = [
        {
            icon: "MdOutlineRemoveRedEye",
            onClick: (row) =>  {
                setIsDetailModal(true)
                setSelectVendorId(row.id)

            }
        },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => {
                console.log(`View ${row.id}`)

            },
        },
        {
            icon: "RiDeleteBinLine",
            onClick: (row) => {
                setSelectVendor(row)
                setDeleteModalOpen(true)

            }
        }
    ];
    const handleConfirmDelete = async () => {
        if (!selectVendor) return;
        setIsDeleting(true);
        try {
            await deleteVendor(selectVendor.id).unwrap();
            setDeleteModalOpen(false);
            setSelectVendor(null);
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
            <CreateStaff
                isOpen={isModalOpen}
                onNotification={handleNotification}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
               <DetailMember
                isOpen={isDetailModal}
                onNotification={handleNotification}
                onClose={() => {
                    setIsDetailModal(false);
                }}
                vendorId={vendorId}
            />
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectVendor?.name}
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
