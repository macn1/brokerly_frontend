import React, { useState } from "react";
import { useCreateApartmentAmenityMutation } from "../../../store/api/apartment";

const AmenityCreateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: "", logo: null });
    const [createAmenity] = useCreateApartmentAmenityMutation();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setFormData({ ...formData, logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        if (formData.logo) data.append("logo", formData.logo);

        try {
            await createAmenity(data).unwrap();
            setFormData(formData.name = '')
            alert("Amenity created successfully.");
            onClose(); // Close the modal
        } catch (err) {
            console.error("Error creating amenity:", err);
            alert("Failed to create amenity.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Add New Amenity</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Logo</label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AmenityCreateModal;
