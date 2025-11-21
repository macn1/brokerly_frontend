import React, { useState, useEffect } from "react";
import {
    useGetFacilityByIdQuery,
    useUpdateFacilityMutation,
} from "../../../store/api/apartment";

const FacilityCreateModal = ({
    isOpen,
    onClose,
    onSuccess,
    createFacility,
    facilityId,
    onNotification
}) => {
    const [formData, setFormData] = useState({
        type: "included",
        name: "",
        description: "",
    });

    const { data: facilityData, isSuccess } = useGetFacilityByIdQuery(facilityId, {
        skip: !facilityId, // skip if no ID (means creating)
    });

    const [updateFacility] = useUpdateFacilityMutation();

    // 🔹 Populate form when editing
    useEffect(() => {
        if (isSuccess && facilityData) {
            setFormData({
                type: facilityData.type || "included",
                name: facilityData.name || "",
                description: facilityData.description || "",
            });
        }
    }, [isSuccess, facilityData]);

    // 🔹 Reset form when modal closes or switching to create
    useEffect(() => {
        if (!isOpen || !facilityId) {
            setFormData({
                type: "included",
                name: "",
                description: "",
            });
        }
    }, [isOpen, facilityId]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (facilityId) {
                // 🔹 Update mode
                await updateFacility({ id: facilityId, data: formData }).unwrap();
                console.log(facilityId, formData, "andi");
                onNotification("Facility updated successfully.", "success");


            } else {
                // 🔹 Create mode
                await createFacility(formData).unwrap();
                onNotification("Facility created successfully..", "success");

            }

          
            onClose();
            setFormData({
                type: "included",
                name: "",
                description: "",
            });
        } catch (err) {
            console.error(err);
            onNotification(`Operation failed.`, "error");

        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                <h2 className="text-lg font-bold mb-4">
                    {facilityId ? "Edit Facility" : "Create Facility"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        >
                            <option value="included">Included</option>
                            <option value="additional">Additional</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                setFormData({
                                    type: "included",
                                    name: "",
                                    description: "",
                                });
                            }}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {facilityId ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FacilityCreateModal;
