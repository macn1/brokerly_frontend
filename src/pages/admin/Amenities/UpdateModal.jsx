import React, { useState, useEffect } from "react";


import {
  useCreateApartmentAmenityMutation,
  useGetAmenitybyIdQuery,
  useUpdateAmenityMutation,
} from "../../../store/api/apartment";

    const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");

const AmenityUpdate = ({ isOpen, onClose, ApartmentId,onNotification }) => {
  const [formData, setFormData] = useState({ name: "", logo: null });

  const [createAmenity] = useCreateApartmentAmenityMutation();
  const [updateAmenity] = useUpdateAmenityMutation();


  const { data: amenityData, isSuccess } = useGetAmenitybyIdQuery(ApartmentId, {
    skip: !ApartmentId,
  });

  // Pre-fill form when amenity data is loaded
  useEffect(() => {
    if (isSuccess && amenityData) {
      setFormData({
        name: amenityData.name || "",
        logo: null,
      });
    }
  }, [isSuccess, amenityData]);

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
      if (ApartmentId) {
        await updateAmenity({ id: ApartmentId, data }).unwrap();
        // alert("Amenity updated successfully.");
          onNotification("Amenity updated successfully.", "success");
      } else {
        await createAmenity(data).unwrap();
        // alert("Amenity created successfully.");
        
      }

      setFormData({ name: "", logo: null });
      onClose();
    } catch (err) {
      console.error("Error saving amenity:", err);
    //   alert("Failed to save amenity.");
        onNotification(`Failed to save amenity.`, "error");
    }
  };

  if (!isOpen) return null;

  // ✅ Construct full logo URL safely
  const logoUrl = amenityData?.logo
    ? `${BASE_URL}${amenityData.logo.startsWith("/") ? amenityData.logo : `/${amenityData.logo}`}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {ApartmentId ? "Edit Amenity" : "Add New Amenity"}
        </h2>
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

            {/* ✅ Render existing logo with proper BASE_URL */}
            {logoUrl && !formData.logo && (
              <div className="mt-2">
                <img
                  src={logoUrl}
                  alt="Existing Logo"
                  className="h-16 w-16 object-cover rounded border"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>
            )}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {ApartmentId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmenityUpdate;
