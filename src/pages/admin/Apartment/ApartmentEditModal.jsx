import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useUpdateApartmentMutation, useApartmentDetailQuery } from "../../../store/api/apartment";
// Helper function to get absolute image URLs
const getAbsoluteImageUrl = (relativePath) => {
  if (!relativePath) return '';

  // If it's already a full URL, return as is
  if (relativePath.startsWith('http')) return relativePath;

  // Remove /api from the base URL since image paths start from root
  const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';
  return `${baseUrl}${relativePath}`;
};

const ApartmentEditModal = ({ isOpen, onClose, amenity, facilty, extraService, apartmentId,  onNotification   }) => {
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

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
    etc_service: [],
  });

  const [updateApartment, { isLoading }] = useUpdateApartmentMutation();
  const { data: apartmentData, error, isLoading: isLoadingData } = useApartmentDetailQuery(apartmentId, {
    skip: !apartmentId,
  });

  // Populate form when apartment data is loaded
  useEffect(() => {
    if (apartmentData) {
      console.log('Apartment data loaded:', apartmentData);
      const { address, amenities, facilities, etc_service, images, ...basicData } = apartmentData;

      // Set basic form data
      setFormData(prev => ({
        ...prev,
        name: basicData.name || "",
        location: basicData.location || "",
        price: basicData.price || "",
        description: basicData.description || "",
        address_line: address?.address_line || "",
        city: address?.city || "",
        state: address?.state || "",
        district: address?.district || "",
        pincode: address?.pincode || "",
        country: address?.country || "",
        amenities: amenities?.map(item => item.id) || [],
        facilities: facilities?.map(item => item.id) || [],
        etc_service: etc_service?.map(item => item.id) || [],
      }));

      // Handle images
      if (images && images.length > 0) {
        console.log('Setting existing images:', images);
        setExistingImages(images);

        // Separate main image (sequence 1) and side images
        const mainImg = images.find(img => img.sequence === "1");
        const sideImgs = images.filter(img => img.sequence !== "1").sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence));

        // Set side images (existing ones, not files)
        setSideImages(sideImgs);
      }
    }
  }, [apartmentData]);

  // Reset form when modal closes
  //   useEffect(() => {
  //     if (!isOpen) {
  //       setMainImage(null);
  //       setSideImages([]);
  //       setExistingImages([]);
  //       setFormData({
  //         name: "",
  //         location: "",
  //         price: "",
  //         description: "",
  //         address_line: "",
  //         city: "",
  //         state: "",
  //         district: "",
  //         pincode: "",
  //         country: "",
  //         amenities: [],
  //         facilities: [],
  //         etc_service: [],
  //       });
  //     }
  //   }, [isOpen]);

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

  // Count total images (new + existing that are kept)
  const getTotalSideImagesCount = () => {
    const newImagesCount = sideImages.filter(img => img instanceof File).length;
    const keptExistingCount = sideImages.filter(img => !(img instanceof File)).length;
    return newImagesCount + keptExistingCount;
  };

  // Submit for update
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

    // Validate side images count - must be exactly 6
    const totalSideImages = getTotalSideImagesCount();
    if (totalSideImages !== 6) {
      onNotification(`Please upload exactly 6 side images. Currently you have ${totalSideImages} side images.`, "error");
   
      return;
    }

    const data = new FormData();

    // Basic fields
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("description", formData.description);

    // Address fields
    data.append("address.address_line", formData.address_line);
    data.append("address.city", formData.city);
    data.append("address.district", formData.district);
    data.append("address.state", formData.state);
    data.append("address.pincode", formData.pincode);
    data.append("address.country", formData.country);

    // Many-to-many
    formData.amenities.forEach((id) => data.append("amenities", id));
    formData.facilities.forEach((id) => data.append("facilities", id));
    formData.etc_service.forEach((id) => data.append("etc_service", id));

    // Handle images - ALWAYS send exactly 7 images (1 main + 6 side)
    let imageIndex = 0;

    // Main image (sequence 1)
    if (mainImage) {
      data.append(`images[${imageIndex}].image`, mainImage);
      data.append(`images[${imageIndex}].sequence`, "1");
      imageIndex++;
    }

    // Side images (sequences 2-7)
    sideImages.forEach((file, i) => {
      if (file instanceof File) {
        // New uploaded file
        data.append(`images[${imageIndex}].image`, file);
        data.append(`images[${imageIndex}].sequence`, (imageIndex + 1).toString());
        imageIndex++;
      }
    });

    try {
      const response = await updateApartment({
        id: apartmentId,
        data: data
      }).unwrap();
      console.log("✅ Apartment updated:", response);
 ;
      onNotification("Apartment updated successfully!", "success");
   
      // Reset and close
      onClose();
    } catch (error) {
      console.error();
      onNotification("❌ Error updating apartment:", "error");
    

    }
  };

  if (!isOpen) return null;

  const totalSideImages = getTotalSideImagesCount();
  const canUpdate = totalSideImages === 6;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Apartment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Show loader inside modal while data is loading */}
        {isLoadingData ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading apartment details...</p>
            </div>
          </div>
        ) : !apartmentData ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <p className="text-gray-600">Apartment not found</p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Apartment Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-bg[#3e3e45] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:-[#3e3e45] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:-[#3e3e45] focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:-[#3e3e45] focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h3>
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
                    <label className="block font-medium text-gray-700 mb-2 capitalize">
                      {field.replace("_", " ")} *
                    </label>
                    <input
                      type="text"
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:-[#3e3e45] focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Apartment Images</h3>

              {/* Main Image */}
              <div className="mb-8">
                <label className="block font-medium text-gray-700 mb-3">Main Image</label>

                {/* Current Main Image */}
                {existingImages.find(img => img.sequence === "1") && !mainImage && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Main Image:</p>
                    <div className="relative inline-block">
                      <img
                        src={getAbsoluteImageUrl(existingImages.find(img => img.sequence === "1").image)}
                        alt="Current main"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                        onError={(e) => {
                          console.error('Failed to load main image');
                          e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Upload New Main Image */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                    id="main-image-upload"
                  />
                  <label
                    htmlFor="main-image-upload"
                    className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2 font-medium"
                  >
                    <span>
                      {existingImages.find(img => img.sequence === "1") ? 'Change Main Image' : 'Upload Main Image'}
                    </span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    This will be the primary display image
                  </p>
                </div>

                {/* New Main Image Preview */}
                {mainImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">New Main Image Preview:</p>
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(mainImage)}
                        alt="New main preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500 shadow-sm"
                      />
                      <button
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
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
                <div className="flex items-center justify-between mb-3">
                  <label className="block font-medium text-gray-700">Side Images *</label>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${canUpdate
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {totalSideImages}/6 {canUpdate ? '✓ Ready' : 'Required'}
                  </span>
                </div>

                {/* Upload New Side Images */}
                {sideImages.length < 6 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-white mb-4">
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
                      className="cursor-pointer bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2 font-medium"
                    >
                      <span>Add Side Images</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Select {6 - sideImages.length} more image(s) to complete
                    </p>
                  </div>
                )}

                {/* Validation Message */}
                {!canUpdate && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">
                      ⚠️ Please upload exactly 6 side images to update the apartment.
                    </p>
                  </div>
                )}

                {/* All Side Images */}
                {sideImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                    {sideImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={file instanceof File ? URL.createObjectURL(file) : getAbsoluteImageUrl(file.image)}
                          alt={`Side ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-300 shadow-sm group-hover:border-blue-400 transition-colors"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                            console.error('Failed to load image:', file);
                          }}
                        />
                        <button
                          onClick={() => removeSideImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                        >
                          <IoClose size={14} />
                        </button>
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {file instanceof File ? 'New' : 'Existing'}
                        </div>
                        <div className="text-xs text-center text-gray-500 truncate">
                          {file instanceof File ? file.name : `Seq: ${file.sequence}`}
                        </div>
                      </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: 6 - sideImages.length }).map((_, index) => (
                      <div key={`empty-${index}`} className="border-2 border-dashed border-gray-200 rounded-lg h-24 flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400 text-sm">Empty</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenity && amenity.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(item.id)}
                      onChange={() => handleCheckboxChange("amenities", item.id)}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Facility Services</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-3 text-lg">Included Services</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {facilty
                      ?.filter((item) => item.type === "included")
                      .map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.facilities.includes(item.id)}
                            onChange={() => handleCheckboxChange("facilities", item.id)}
                            className="w-4 h-4 text-green-500 rounded focus:ring-green-400"
                          />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </label>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-3 text-lg">Additional Services</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {facilty
                      ?.filter((item) => item.type === "additional")
                      .map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.facilities.includes(item.id)}
                            onChange={() => handleCheckboxChange("facilities", item.id)}
                            className="w-4 h-4 text-blue-500 rounded "
                          />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Services */}
            {extraService && extraService.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Extra Services</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {extraService.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.etc_service.includes(item.id)}
                        onChange={() => handleCheckboxChange("etc_service", item.id)}
                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                      />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${canUpdate
                  ? 'bg-[#3e3e45] text-white '
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                onClick={handleSubmit}
                disabled={isLoading || !canUpdate}
              >
                {isLoading ? "Updating..." : "Update Apartment"}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApartmentEditModal;