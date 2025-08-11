import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
import AmenityCreateModal from "./CreateAmenityModal";
import { useGetAllApartmentAmenityQuery, useDeleteApartmentAmenityMutation, useCreateApartmentAmenityMutation } from '../../../store/api/apartment'

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteAmenity] = useDeleteApartmentAmenityMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);

    const { data: ApartmentsData, refetch } = useGetAllApartmentAmenityQuery({
        page: currentPage,
        page_size: pageSize,
        ...filters,
    });


    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (ApartmentsData) {
            setTableData(ApartmentsData.results)
            setCount(ApartmentsData.count)
        }

    }, [ApartmentsData])

    console.log(count, "count");


    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
        setCurrentPage(1);
    };

    const tableHeaders = [
        { label: "Name", key: "name" },
        { label: "Logo", key: "logo" },
    ];


    const actionButtons = [
        {
            icon: "MdOutlineRemoveRedEye",
            onClick: (row) => console.log(`View ${row.id}`),
        },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => console.log(`Edit ${row.id}`),
        },
        {
            icon: "RiDeleteBinLine",
            onClick: async (row) => {
                const confirmDelete = window.confirm(`Are you sure you want to delete this ${row.name}?`);
                if (confirmDelete) {
                    try {
                        await deleteAmenity(row.id).unwrap();
                        alert("Apartment Amenity deleted successfully.");

                        refetch()
                    } catch (error) {
                        console.error("Delete failed:", error);
                        alert("Failed to delete apartment Amenity.");
                    }
                }
            },
        }
    ];

    const filterFields = [
        { name: "name", label: "User Name", type: "text", width: "w-64" },
        { name: "email", label: "Email", type: "text", width: "w-64" },
        { name: "role", label: "Role", type: "text", width: "w-64" },

    ];

    return (
        <>
            <ListLayout
                title="Staff List"
                filterFields={filterFields}
                onFilterChange={handleFilterChange}
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
            <AmenityCreateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    refetch(); // refresh list after modal is closed
                }}
            />

        </>
    );
};

export default List;
