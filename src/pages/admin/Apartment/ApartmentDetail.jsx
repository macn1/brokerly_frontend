import React, { useState, useEffect } from "react";
import { 
  IoClose, 
  IoLocationOutline, 
  IoPricetagOutline, 
  IoCheckmarkCircle,
  IoChevronBack,
  IoChevronForward 
} from "react-icons/io5";
import { useApartmentDetailQuery } from "../../../store/api/apartment";

// Helper function to get absolute image URLs
const getAbsoluteImageUrl = (relativePath) => {
  if (!relativePath) return '';
  if (relativePath.startsWith('http')) return relativePath;
  const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';
  return `${baseUrl}${relativePath}`;
};

const ApartmentDetailModal = ({ isOpen, onClose, apartmentId }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { data: apartmentData, isLoading: isLoadingData } = useApartmentDetailQuery(apartmentId, {
    skip: !apartmentId,
  });

  // Auto-slide effect
  useEffect(() => {
    if (!apartmentData?.images?.length || apartmentData.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex(prev => 
        prev < apartmentData.images.length - 1 ? prev + 1 : 0
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [apartmentData?.images]);

  const goToNext = () => {
    if (!apartmentData?.images?.length) return;
    setActiveImageIndex(prev => 
      prev < apartmentData.images.length - 1 ? prev + 1 : 0
    );
  };

  const goToPrev = () => {
    if (!apartmentData?.images?.length) return;
    setActiveImageIndex(prev => 
      prev > 0 ? prev - 1 : apartmentData.images.length - 1
    );
  };

  if (!isOpen) return null;

  if (isLoadingData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading apartment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!apartmentData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <p className="text-gray-600">Apartment not found</p>
          </div>
        </div>
      </div>
    );
  }

  const { 
    name, 
    location, 
    price, 
    description, 
    address, 
    amenities = [], 
    facilities = [], 
    etc_service = [], 
    images = [],
    created 
  } = apartmentData;

  const mainImage = images.find(img => img.sequence === "1");
  const sideImages = images.filter(img => img.sequence !== "1").sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence));
  const allImages = mainImage ? [mainImage, ...sideImages] : sideImages;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header with Carousel */}
        <div className="relative">
          {allImages.length > 0 && (
            <div className="relative h-80 bg-gray-200 overflow-hidden">
              {/* Main Image */}
              <img
                src={getAbsoluteImageUrl(allImages[activeImageIndex]?.image)}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
              />
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                  >
                    <IoChevronBack className="text-xl" />
                  </button>
                  
                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                  >
                    <IoChevronForward className="text-xl" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeImageIndex 
                            ? 'bg-white scale-110' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-20rem)]">
          {/* Main Content */}
          <div className="p-8">
            {/* Title and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <IoLocationOutline className="mr-2" />
                <span>{location}</span>
              </div>
              {price && (
                <div className="flex items-center text-2xl font-bold text-blue-600 mb-4">
                  <IoPricetagOutline className="mr-2" />
                  <span>₹{price}/day</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Amenities with Logos - Updated for 7 per row */}
            {amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Amenities & Facilities</h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {amenities.map((amenity) => (
                    <div 
                      key={amenity.id} 
                      className="flex flex-col items-center text-center bg-white rounded-lg p-2 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 mb-2 flex items-center justify-center bg-blue-50 rounded-full">
                        {amenity.logo ? (
                          <img
                            src={getAbsoluteImageUrl(amenity.logo)}
                            alt={amenity.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        {/* Fallback icon if logo fails to load */}
                        <div 
                          className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold hidden"
                          style={{ display: amenity.logo ? 'none' : 'flex' }}
                        >
                          {amenity.name.charAt(0)}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 leading-tight line-clamp-2">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {facilities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Services</h2>
                
                {/* Included Services */}
                {facilities.filter(f => f.type === 'included').length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-green-600 mb-4 flex items-center">
                      <IoCheckmarkCircle className="mr-2" />
                      Included Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {facilities
                        .filter(f => f.type === 'included')
                        .map((facility) => (
                          <div key={facility.id} className="flex items-center space-x-3 bg-green-50 rounded-lg p-3">
                            <IoCheckmarkCircle className="text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{facility.name}</span>
                            {facility.description && (
                              <span className="text-sm text-gray-500 ml-2">- {facility.description}</span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Additional Services */}
                {facilities.filter(f => f.type === 'additional').length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-blue-600 mb-4 flex items-center">
                      <IoCheckmarkCircle className="mr-2" />
                      Additional Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {facilities
                        .filter(f => f.type === 'additional')
                        .map((facility) => (
                          <div key={facility.id} className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
                            <IoCheckmarkCircle className="text-blue-500 flex-shrink-0" />
                            <span className="text-gray-700">{facility.name}</span>
                            {facility.description && (
                              <span className="text-sm text-gray-500 ml-2">- {facility.description}</span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Extra Services */}
            {etc_service.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Extra Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {etc_service.map((service) => (
                    <div key={service.id} className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                      <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                      {service.unit_price && (
                        <p className="text-orange-600 font-semibold text-lg">
                          ₹{service.unit_price} per {service.unit}
                        </p>
                      )}
                      {service.minimum_unit > 1 && (
                        <p className="text-sm text-gray-600 mt-1">
                          Minimum {service.minimum_unit} {service.unit}(s)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all hover:border-blue-400 ${
                        index === activeImageIndex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={getAbsoluteImageUrl(image.image)}
                        alt={`${name} - Image ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Created Date */}
            {created && (
              <div className="text-sm text-gray-500 text-center border-t pt-6">
                Listed on {new Date(created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailModal;