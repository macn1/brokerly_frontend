import React from 'react'
import ListLayout from "../common/ListLayout";
import { useState, useEffect } from 'react';
import { useGetAllcontacatsQuery } from '../../../store/api/bookings'
function Contacted() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);

    const { data: contactsData } = useGetAllcontacatsQuery({
        page: currentPage,
        page_size: pageSize,
        ...filters,
    });


    const [aptdata, setAptdata] = useState([])

    useEffect(() => {
        if (contactsData) {
            setTableData(contactsData.results)
            setCount(contactsData.count)
        }

    }, [contactsData])

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
        { label: "Email", key: "email" },
        { label: "Message", key: "message" },

        ,
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
            />

        </>
    );
}

export default Contacted
