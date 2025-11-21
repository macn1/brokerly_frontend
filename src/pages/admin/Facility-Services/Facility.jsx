import React, { useMemo, useState } from "react";
import ListLayout from "../common/ListLayout";
import FacilityCreateModal from "./CreateFAcilityModal";
import { 
  useGetAllPaginatedApartmentFacilitiesQuery, 
  useDeleteApartmentFacilitiesMutation, 
  useCreateApartmentFacilityMutation 
} from '../../../store/api/apartment';
import ConfirmDeleteModal from "../common/DeleteModal";
import SuccessModal from "../common/Successmodal";

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteFacility] = useDeleteApartmentFacilitiesMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters] = useState({});
    const [facilityId, setFacilityId] = useState(null);
    const [createFacility] = useCreateApartmentFacilityMutation();
    const [message, setSuccessMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectFacility, setSelectFacility] = useState(null);

    const { data: ApartmentsData } = 
        useGetAllPaginatedApartmentFacilitiesQuery({
            page: currentPage,
            page_size: pageSize,
            ...filters,
        });



    // ⛔ DO NOT STORE API RESULT INTO STATE
    const tableData = ApartmentsData?.results || [];
    const count = ApartmentsData?.count || 0;

    const tableHeaders = useMemo(() => [
        { label: "Name", key: "name" },
        { label: "Service Type", key: "type" },
    ], []);

    const actionButtons = useMemo(() => [
        {
            icon: "MdOutlineRemoveRedEye",
            onClick: (row) => console.log(`View ${row.id}`),
        },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => {
                setFacilityId(row.id);
                setIsModalOpen(true);
            },
        },
        {
            icon: "RiDeleteBinLine",
            onClick: (row) => {
                setSelectFacility(row);
                setDeleteModalOpen(true);
            },
        }
    ], []);

    const handleConfirmDelete = async () => {
        if (!selectFacility) return;

        setIsDeleting(true);

        try {
            await deleteFacility(selectFacility.id).unwrap();
            setDeleteModalOpen(false);
            setSelectFacility(null);
         
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete Facility.");
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
                title=""
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

            <FacilityCreateModal
                isOpen={isModalOpen}
                onNotification={handleNotification}
                onClose={() => {
                    setIsModalOpen(false);
                    setFacilityId(null);
                }}
                facilityId={facilityId}
                createFacility={createFacility}
                // onSuccess={refetch}
            />

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectFacility?.name}
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

export default List;
