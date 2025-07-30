import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {useGetAllApartmentAmenityQuery} from "../../../store/api/apartment"

const amenityOptions = [
  { id: 8, name: "WiFi" },
  { id: 9, name: "TV" },
  { id: 10, name: "Parking" },
  { id: 11, name: "Gym" },
  { id: 12, name: "AC" },
  { id: 13, name: "Fridge" },
  { id: 14, name: "Heater" },
  { id: 15, name: "Balcony" },
  { id: 16, name: "Kitchen" },
];

const facilityOptions = [
  { id: 1, name: "Lift" },
  { id: 2, name: "Power Backup" },
  { id: 3, name: "Swimming Pool" },
  { id: 4, name: "Security" },
  { id: 5, name: "CCTV" },
  { id: 6, name: "Water Supply" },
  { id: 7, name: "Fire Safety" },
  { id: 8, name: "Club House" },
  { id: 9, name: "Parking" },
  { id: 10, name: "Gym" },
  { id: 11, name: "Garden" },
  { id: 12, name: "Play Area" },
  { id: 13, name: "Intercom" },
  { id: 14, name: "Wifi" },
  { id: 15, name: "Laundry" },
  { id: 16, name: "Reception" },
];

const etcServiceOptions = [
  { id: 1, name: "Housekeeping" },
  { id: 2, name: "Maintenance" },
  { id: 3, name: "Pest Control" },
  { id: 4, name: "Laundry" },
  { id: 5, name: "Concierge" },
  { id: 6, name: "Delivery" },
];

const ApartmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    website_url: "",
    description: "",
    address_line: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    country: "",
    amenities: [],
    facilities: [],
    etc_service: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  
  const handleCheckboxChange = (field, id) => {
    setFormData((prev) => {
      const updated = prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
      category: parseInt(formData.category),
      location: formData.location,
      description: formData.description,
      website_url: formData.website_url,
      address: {
        address_line: formData.address_line,
        state: formData.state,
        district: formData.district,
        city: formData.city,
        pincode: formData.pincode,
        country: formData.country,
      },
      amenities: formData.amenities,
      facilities: formData.facilities,
      etc_service: formData.etc_service,
    };

    onSubmit(payload);
    console.log(payload,"payloaad");
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Apartment</h2>
          <button onClick={onClose}>
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Apartment Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Website</label>
            <input
              type="text"
              value={formData.website_url}
              onChange={(e) => handleChange("website_url", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Category</label>
            <input
              type="number"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium">Address Line</label>
            <input
              type="text"
              value={formData.address_line}
              onChange={(e) => handleChange("address_line", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">District</label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => handleChange("district", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Checkbox Sections */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenityOptions.map((item) => (
              <label key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(item.id)}
                  onChange={() => handleCheckboxChange("amenities", item.id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {facilityOptions.map((item) => (
              <label key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(item.id)}
                  onChange={() => handleCheckboxChange("facilities", item.id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Etc Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {etcServiceOptions.map((item) => (
              <label key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.etc_service.includes(item.id)}
                  onChange={() => handleCheckboxChange("etc_service", item.id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-zinc-500 text-white px-5 py-2 rounded hover:bg-zinc-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentModal;
