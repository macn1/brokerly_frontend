import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
import ApartmentModal from './ApartmentCreateModal'
import { useGetAllApartmentsQuery } from '../../../store/api/apartment'

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [count, setCount] = useState(10);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);

    const handleAddApartment = (formData) => {
        console.log("Form submitted with:", formData);
        setIsModalOpen(false); // Close modal after submission
    };

    const { data: ApartmentsData } = useGetAllApartmentsQuery({
        page: currentPage,
        page_size: pageSize,
        ...filters,
    });
   
    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (ApartmentsData) {
            setTableData(ApartmentsData)
        }

    }, [ApartmentsData])

    console.log(ApartmentsData, "ApartmentsData");


    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
        setCurrentPage(1);
    };



    const tableHeaders = [
        { label: "Name", key: "name" },
        { label: "Location", key: "location" },
        { label: "created", key: "website_url" },
        { label: "website url", key: "website_url" },
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
            onClick: (row) => console.log(`Delete ${row.id}`),
        },
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
                onClose={() => setIsModalOpen(false)}
                title="Edit Property"
                onSubmit={handleAddApartment} 
            />
        </>
    );
};

export default List;
