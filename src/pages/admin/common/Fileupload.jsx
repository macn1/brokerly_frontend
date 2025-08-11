import { useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { useUploadApartmentImagesMutation,useCreateApartmentMutation, useGetAllApartmentsQuery } from "../../../store/api/apartment";

const ImageUploadModal = ({ isOpen, onClose, apartmentData  }) => {


  console.log("apartment apartmentData s",apartmentData);
  
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [createdApartmentId, setCreatedApartmentId] = useState(null);
  const [uploadImages] = useUploadApartmentImagesMutation();
    const [createApartment] = useCreateApartmentMutation();
;
  
  const clearPreviews = () => {
    if (mainImage) URL.revokeObjectURL(mainImage.preview);
    sideImages.forEach(img => URL.revokeObjectURL(img.preview));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      clearPreviews();
      setMainImage({
        file,
        preview: URL.createObjectURL(file)
      });
      setSideImages([]); // Reset side images when new main image is selected
    }
  };

  const handleSideImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newSideImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSideImages(prev => [...prev, ...newSideImages]);
    }
  };

  const handleRemoveSideImage = (index) => {
    URL.revokeObjectURL(sideImages[index].preview);
    setSideImages(prev => prev.filter((_, i) => i !== index));
  };

 const handleUpload = async () => {
  if (!mainImage) return alert("Please select a main image!");

  try {
    let aptId = createdApartmentId;

    if (!aptId) {
      // create apartment first
      const res = await createApartment(apartmentData).unwrap();
      aptId = res.id;
      setCreatedApartmentId(res.id);
    }

    const formData = new FormData();
    formData.append("apartment", aptId);
    formData.append("image", mainImage.file);
    formData.append("sequence", "1");

    sideImages.forEach((img, index) => {
      formData.append("side_images", img.file);
      formData.append("side_sequences", `${index + 2}`);
    });

    await uploadImages(formData).unwrap();

    alert("Apartment and Images uploaded successfully!");

    clearPreviews();
    setMainImage(null);
    setSideImages([]);
    onClose();

  } catch (err) {
    console.error("Error during upload:", err);
    alert("Upload failed: " + (err.data?.message || "Please try again"));
  }
};


  const handleClose = () => {
    clearPreviews();
    setMainImage(null);
    setSideImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-600">
          <IoClose size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Upload Apartment Images</h2>

        {/* Main Image Section */}
        <div className="mb-6 p-4 border rounded-lg">
          <label className="block font-medium mb-2">Main Image (Featured)</label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleMainImageChange}
                className="hidden"
              />
              {mainImage ? (
                <img
                  src={mainImage.preview}
                  alt="Main preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-gray-500 text-center p-4">
                  <span>Click to select</span>
                </div>
              )}
            </label>
            <div className="text-sm text-gray-500">
              <p>This will be the featured image of your apartment.</p>
              <p>Recommended ratio: 16:9</p>
            </div>
          </div>
        </div>

        {/* Side Images Section */}
        <div className="mb-6 p-4 border rounded-lg">
          <label className="block font-medium mb-2">Additional Images (Max 6)</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Existing side image previews */}
            {sideImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.preview}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  onClick={() => handleRemoveSideImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Add more button (show only if we have less than 10 images) */}
            {sideImages.length < 6 && (
              <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSideImagesChange}
                  className="hidden"
                />
                <div className="text-gray-500 text-center p-4">
                  <span>+ Add</span>
                  <p className="text-xs mt-1">{10 - sideImages.length} remaining</p>
                </div>
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500">
            You can upload up to 6 additional images. Drag and drop is also supported.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!mainImage}
            className={`px-4 py-2 rounded-md text-white ${mainImage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Upload All Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;