import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCreateApartmentMutation } from "../../../store/api/apartment";

const ApartmentModal = ({ isOpen, onClose, amenity, facilty, extraService ,onNotification}) => {
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    address_line: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    country: "",
    amenities: [],
    facilities: [],
  });

  const [createApartment, { isLoading }] = useCreateApartmentMutation();

  // Handle input changes
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

  // Image handlers
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleSideImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 6 - sideImages.length;
    
    if (files.length > remainingSlots) {
    
      onNotification(`You can only upload ${remainingSlots} more image(s)`, "error");
      return;
    }

    setSideImages((prev) => [...prev, ...files]);
  };

  const removeMainImage = () => {
    setMainImage(null);
  };

  const removeSideImage = (index) => {
    setSideImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.location ||
      !formData.address_line ||
      !formData.city
    ) {
     
      onNotification("Please fill in all required fields", "error");
      return;
    }

    // Validate side images count
    if (sideImages.length !== 6) {
      onNotification("Please upload exactly 6 side images", "error");
      return;
    }

    const data = new FormData();

    // Basic fields
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("description", formData.description);

    data.append("address.address_line", formData.address_line);
    data.append("address.city", formData.city);
    data.append("address.district", formData.district);
    data.append("address.state", formData.state);
    data.append("address.pincode", formData.pincode);
    data.append("address.country", formData.country);

    formData.amenities.forEach((id) => data.append("amenities", id));
    formData.facilities.forEach((id) => data.append("facilities", id));

    // ✅ Correct image field names with sequence
    let imageIndex = 0;

    if (mainImage) {
      data.append(`images[${imageIndex}].image`, mainImage);
      data.append(`images[${imageIndex}].sequence`, 1);
      imageIndex++;
    }

    sideImages.forEach((file, i) => {
      data.append(`images[${imageIndex}].image`, file);
      data.append(`images[${imageIndex}].sequence`, imageIndex + 1);
      imageIndex++;
    });

    try {
      const response = await createApartment(data).unwrap();
      console.log("✅ Apartment created:", response);
      onNotification("Apartment created successfully!", "success");

      // Reset form
      setMainImage(null);
      setSideImages([]);
      setFormData({
        name: "",
        location: "",
        price: "",
        description: "",
        address_line: "",
        city: "",
        state: "",
        district: "",
        pincode: "",
        country: "",
        amenities: [],
        facilities: [],
      });
      onClose();
    } catch (error) {
      console.error("❌ Error creating apartment:", error);
      onNotification("Failed to create apartment", "error");
    }
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

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Apartment Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold mb-2">Address Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "address_line",
                "city",
                "state",
                "district",
                "pincode",
                "country",
              ].map((field) => (
                <div key={field}>
                  <label className="block font-medium capitalize">
                    {field.replace("_", " ")} *
                  </label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <h3 className="font-semibold mb-3">Apartment Images</h3>
            
            {/* Main Image */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Main Image *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                >
                  <span>Select Main Image</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  This will be the primary display image
                </p>
              </div>

              {mainImage && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main preview"
                      className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      onClick={removeMainImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {mainImage.name}
                  </div>
                </div>
              )}
            </div>

            {/* Side Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-medium">
                  Side Images * ({sideImages.length}/6)
                </label>
                {sideImages.length < 6 && (
                  <span className="text-sm text-gray-500">
                    {6 - sideImages.length} remaining
                  </span>
                )}
              </div>
              
              {sideImages.length < 6 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleSideImagesChange}
                    className="hidden"
                    id="side-image-upload"
                  />
                  <label
                    htmlFor="side-image-upload"
                    className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Select Side Images</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Select {6 - sideImages.length} more image(s)
                  </p>
                </div>
              )}

              {/* Side Images Grid */}
              {sideImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                  {sideImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Side ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
                      <button
                        onClick={() => removeSideImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <IoClose size={14} />
                      </button>
                      <div className="text-xs text-center mt-1 text-gray-600">
                        Sequence: {index + 2}
                      </div>
                      <div className="text-xs text-center text-gray-500 truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty slots */}
                  {Array.from({ length: 6 - sideImages.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="border-2 border-dashed border-gray-200 rounded-lg h-24 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Empty</span>
                    </div>
                  ))}
                </div>
              )}

              {sideImages.length !== 6 && sideImages.length > 0 && (
                <div className="text-sm text-orange-600 mt-2">
                  ⚠️ Please upload exactly 6 side images. Currently you have {sideImages.length}.
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenity.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 text-sm"
                >
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
          <div>
            <h3 className="font-semibold mb-2">Facility Services</h3>

            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-1">Included Services</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {facilty
                  .filter((item) => item.type === "included")
                  .map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 text-sm"
                    >
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
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Additional Services</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {facilty
                  .filter((item) => item.type === "additional")
                  .map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 text-sm"
                    >
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
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-zinc-500 text-white px-5 py-2 rounded hover:bg-zinc-700 disabled:bg-gray-400 transition-colors"
              onClick={handleSubmit}
              disabled={isLoading || sideImages.length !== 6}
            >
              {isLoading ? "Creating..." : "Create Apartment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentModal;