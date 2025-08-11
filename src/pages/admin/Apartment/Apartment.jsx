import React, { useEffect, useState } from "react";
import ListLayout from "../common/ListLayout";
import ApartmentModal from './ApartmentCreateModal'
import { useGetAllApartmentsQuery, useGetAllApartmentAmenityQuery, useGetAllApartmentFacilitiesQuery, useGetAllapartmentsExtraserviceQuery, useDeleteApartmentMutation } from '../../../store/api/apartment'
import ApartmentDetailModal from './ApartmentDetail'
const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteApartment] = useDeleteApartmentMutation();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);
    const [amenity, setAmenity] = useState([])

    const [count, setCount] = useState(10);
    const [filters, setFilters] = useState({});
    const [tableData, setTableData] = useState([]);

    const handleAddApartment = (formData) => {
        console.log("Form submitted with:", formData);
        setIsModalOpen(false);
    };

    const { data: ammenitydata } = useGetAllApartmentAmenityQuery()

    const { data: extraService } = useGetAllapartmentsExtraserviceQuery()

    const { data: facilty } = useGetAllApartmentFacilitiesQuery()

    console.log(extraService, "facilty");


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
    useEffect(() => {
        if (ammenitydata) {
            setAmenity(ammenitydata.results)
        }

    }, [ammenitydata])


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
            onClick: (row) => {
                 console.log("Selected Apartment ID:", row.id);
                setSelectedApartmentId(row.id);
                setIsDetailModalOpen(true);
            }
        },
        {
            icon: "MdOutlineModeEdit",
            onClick: (row) => console.log(`Edit ${row.id}`),
        },
        {
            icon: "RiDeleteBinLine",
            onClick: async (row) => {
                const confirmDelete = window.confirm(`Are you sure you want to delete apartment ID ${row.id}?`);
                if (confirmDelete) {
                    try {
                        await deleteApartment(row.id).unwrap();
                        alert("Apartment deleted successfully.");
                    } catch (error) {
                        console.error("Delete failed:", error);
                        alert("Failed to delete apartment.");
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
                onClose={() => setIsModalOpen(false)}
                title="Edit Property"
                onSubmit={handleAddApartment}
            />
            <ApartmentDetailModal
                isOpen={isDetailModalOpen}
                apartmentId={selectedApartmentId}
                onClose={() => setIsDetailModalOpen(false)}
            />
        </>
    );
};

export default List;
