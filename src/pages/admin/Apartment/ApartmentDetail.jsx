import React from "react";
import { IoClose } from "react-icons/io5";
import { FiMapPin, FiGlobe, FiList, FiHome, FiStar, FiDollarSign } from "react-icons/fi";
import { useApartmentDetailQuery } from "../../../store/api/apartment";

const ApartmentDetailModal = ({ apartmentId, isOpen, onClose }) => {
  const { data, isLoading, error } = useApartmentDetailQuery(apartmentId);

  if (!isOpen) return null;
  
  if (isLoading) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md">
        <p className="text-red-500 font-medium mb-4">Error loading apartment details.</p>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
        >
          Close
        </button>
      </div>
    </div>
  );

  const apartment = data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">{apartment.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center mb-3">
                <FiHome className="text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Category:</span>
                <span className="ml-2 text-gray-600">{apartment.category}</span>
              </div>
              
              <div className="flex items-center mb-3">
                <FiMapPin className="text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Location:</span>
                <span className="ml-2 text-gray-600">{apartment.location}</span>
              </div>
              
              <div className="flex items-center">
                <FiGlobe className="text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Website:</span>
                <a 
                  href={apartment.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {apartment.website_url}
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <FiMapPin className="mr-2" />
                Address
              </h3>
              <p className="text-gray-600">
                {apartment.address.address_line},<br />
                {apartment.address.city}, {apartment.address.district}<br />
                {apartment.address.state} - {apartment.address.pincode}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FiStar className="mr-2" />
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {apartment.amenities.map(item => (
                <div key={item.id} className="flex items-center bg-gray-50 px-3 py-2 rounded">
                  <span className="text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FiList className="mr-2" />
              Facilities
            </h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Included Facilities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {apartment.facilities.filter(f => f.type === "included").map(item => (
                  <div key={item.id} className="flex items-center bg-green-50 px-3 py-2 rounded">
                    <span className="text-green-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Additional Facilities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {apartment.facilities.filter(f => f.type === "additional").map(item => (
                  <div key={item.id} className="flex items-center bg-blue-50 px-3 py-2 rounded">
                    <span className="text-blue-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ETC Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FiDollarSign className="mr-2" />
              Additional Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {apartment.etc_service.map(item => (
                <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800">{item.name}</div>
                  {item.unit_price && (
                    <div className="text-sm text-gray-600 mt-1">
                      ${item.unit_price}/{item.unit}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailModal;