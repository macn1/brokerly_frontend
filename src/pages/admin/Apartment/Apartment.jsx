import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
import ApartmentModal from './ApartmentCreateModal'
import { useGetAllamenitiesQuery, useGetAllApartmentpaginatedVendorQuery, useGetAllApartmentpaginatedQuery, useGetAllAmenitiesaptQuery, useGetAllApartmentFacilitiesQuery, useGetAllapartmentsExtraserviceQuery, useDeleteApartmentMutation } from '../../../store/api/apartment'
import ApartmentDetailModal from './ApartmentDetail'
import ConfirmDeleteModal from "../common/DeleteModal";
import ApartmentEditModal from "./ApartmentEditModal";
import SuccessModal from '../common/Successmodal'
import { useSelector } from "react-redux";
import ApproveModal from './ApproveModal'
const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteApartment] = useDeleteApartmentMutation();

    const [message, setSuccessMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isEditModalOpen, setIsEditmodalOpen] = useState(false)

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);
    const [amenity, setAmenity] = useState([])

    const [count, setCount] = useState(10);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);

    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectApartment, setSelectApartment] = useState(null)



    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const role = useSelector((state) => state.user.role);
    console.log(role, "role of the user");

    const handleAddApartment = (formData) => {
        console.log("Form submitted with:", formData);
        setIsModalOpen(false);
    };

    const { data: ammenitydata } = useGetAllAmenitiesaptQuery()



    const { data: extraService } = useGetAllapartmentsExtraserviceQuery()

    const { data: facilty } = useGetAllApartmentFacilitiesQuery()



    const adminQuery = useGetAllApartmentpaginatedQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Admin" }
    );

    const vendorQuery = useGetAllApartmentpaginatedVendorQuery(
        { page: currentPage, page_size: pageSize, ...filters },
        { skip: role !== "Vendor" }
    );

    // dynamic data based on user role
    const ApartmentsData = role === "Admin"
        ? adminQuery.data
        : vendorQuery.data;

    const refetch = role === "Admin"
        ? adminQuery.refetch
        : vendorQuery.refetch;

    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (ApartmentsData) {
            setTableData(ApartmentsData.results)
        }

    }, [ApartmentsData])
    useEffect(() => {
        if (ammenitydata) {
            setAmenity(ammenitydata)
        }

    }, [ammenitydata])


  
const handleVisitClick = (row) => {
    setSelectedRow(row);     // store row info
    setIsStatusModalOpen(true);    // open modal
};

    const tableHeaders = [
        { label: "Name", key: "name" },
        { label: "Location", key: "location" },
         {
        label: "Admin-status",
        key: "status",
        formatter: (value) => {
            const statusColors = {
                Pending: "bg-yellow-200 text-yellow-800",
                Approved: "bg-green-200 text-green-800",
                Rejected: "bg-red-200 text-red-800",
            };

            return (
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[value] || "bg-gray-200 text-gray-800"}`}
                >
                    {value}
                </span>
            );
        },
    },
        { label: "Price", key: "price" },
        ...(role === "Admin"
            ? [
                {
                    label: "Approve Projects",
                    key: "visit",
                    formatter: (_, row) => (
                        <button
                            className="px-2 py-1 text-xs bg-[#3e3e45] text-white rounded"
                            onClick={() => handleVisitClick(row)}
                        >
                            Apply Permissions
                        </button>
                    ),
                },
            ]
            : []
        ),
    ];



    const actionButtons = [
        {
            icon: "MdOutlineRemoveRedEye",
            onClick: (row) => {
                console.log("Selected Apartment ID:", row.id);
                setSelectedApartmentId(row.id);
                setIsDetailModalOpen(true);
            }
        },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => {
                console.log("Selected Apartment ID:", row.id);
                setSelectedApartmentId(row.id);
                setIsEditmodalOpen(true);
            }
        },
        {
            icon: "RiDeleteBinLine",
            onClick: (row) => {
                setSelectApartment(row)
                setDeleteModalOpen(true)
            }
        }
    ];
    const handleConfirmDelete = async () => {
        if (!selectApartment) return;
        setIsDeleting(true);
        try {
            await deleteApartment(selectApartment.id).unwrap();
            setDeleteModalOpen(false);
            setSelectApartment(null);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete Apartment");
        } finally {
            setIsDeleting(false);
        }
    };
    const handleNotification = (message, type = "success") => {
        setSuccessMessage(message);
        setMessageType(type);
    };


    return (
        <>
            <ListLayout
                title="Staff List"
                tableHeaders={tableHeaders}
                tableData={tableData}
                actionButtons={actionButtons}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalCount={count}
                onAddNewButton={() => {
                    setIsModalOpen(true);
                }}
            />
            <ApartmentModal
                isOpen={isModalOpen}
                amenity={amenity}
                facilty={facilty}
                extraService={extraService}
                onNotification={handleNotification}
                onClose={() => setIsModalOpen(false)}
                title="Edit Property"
                onSubmit={handleAddApartment}
            />
            <ApartmentDetailModal
                isOpen={isDetailModalOpen}
                amenity={amenity}
                facilty={facilty}
                apartmentId={selectedApartmentId}
                onClose={() => setIsDetailModalOpen(false)}
            />
            <ApartmentEditModal
                isOpen={isEditModalOpen}
                amenity={amenity}
                facilty={facilty}
                apartmentId={selectedApartmentId}
                onClose={() => setIsEditmodalOpen(false)}
                onNotification={handleNotification}

            />
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectApartment?.name}
                isDeleting={isDeleting}
            />
            <SuccessModal
                message={message}
                type={messageType}
                onClose={() => setSuccessMessage("")}
            />
            <ApproveModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                row={selectedRow}
            />

        </>
    );
};

export default List;
