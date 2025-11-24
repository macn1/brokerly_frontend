import React, { useEffect, useState } from "react";
import landfing from "../../../src/assets/apartments/hero1.jpg";
import { useNavigate } from "react-router-dom";
import LeadModal from "./LeadModal";
import { useGetAllApartmentpaginatedClientsQuery } from '../../store/api/apartment';

function Home() {
    const navigate = useNavigate();
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading, error, isError } = useGetAllApartmentpaginatedClientsQuery();
    
    // Debug logging
    useEffect(() => {
        console.log('API Response:', {
            data,
            isLoading,
            error,
            isError
        });
        
        if (error) {
            console.error('API Error details:', error);
            console.error('Error status:', error?.status);
            console.error('Error data:', error?.data);
        }
    }, [data, isLoading, error, isError]);

    // Handle View Details click
    const handleViewDetails = (apartment) => {
        setSelectedApartment(apartment);
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedApartment(null);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="mt-14 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">Loading properties...</div>
                </div>
            </div>
        );
    }

    // Show error state with more details
    if (isError) {
        return (
            <div className="mt-14">
                <main className="flex-1">
                    {/* ---------------- HERO SECTION ---------------- */}
                    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
                        <img
                            src={landfing}
                            alt="Luxury Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 drop-shadow-2xl">
                                Luxury <span className="italic font-serif">Living</span>
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
                                Exceptional residences in the world's finest locations
                            </p>
                        </div>
                    </section>

                    {/* ---------------- ERROR SECTION ---------------- */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
                                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                                <h2 className="text-2xl font-semibold text-red-800 mb-4">
                                    Unable to Load Properties
                                </h2>
                                <p className="text-red-700 mb-4">
                                    There was an error fetching the property data. This could be due to:
                                </p>
                                <ul className="text-red-600 text-left max-w-md mx-auto mb-6">
                                    <li className="mb-2">• Network connection issues</li>
                                    <li className="mb-2">• Server maintenance</li>
                                    <li className="mb-2">• API endpoint changes</li>
                                </ul>
                                
                                {/* Display actual error details for debugging */}
                                <div className="bg-red-100 rounded p-4 mb-4 text-left">
                                    <p className="text-sm text-red-800 font-mono break-words">
                                        Error: {error?.data?.message || error?.data?.detail || error?.status || 'Unknown error'}
                                    </p>
                                </div>

                                <button 
                                    onClick={() => window.location.reload()}
                                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                            
                            {/* Fallback static content */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                                <FallbackPropertyCard />
                                <FallbackPropertyCard />
                                <FallbackPropertyCard />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    // Don't render if no data
    if (!data || !data.results || data.results.length === 0) {
        return (
            <div className="mt-14">
                <main className="flex-1">
                    {/* ---------------- HERO SECTION ---------------- */}
                    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
                        <img
                            src={landfing}
                            alt="Luxury Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 drop-shadow-2xl">
                                Luxury <span className="italic font-serif">Living</span>
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
                                Exceptional residences in the world's finest locations
                            </p>
                        </div>
                    </section>

                    {/* ---------------- NO PROPERTIES SECTION ---------------- */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-4xl font-light text-center mb-12">
                                Curated <span className="italic font-serif">Properties</span>
                            </h2>
                            <div className="text-gray-500 text-lg mb-8">
                                No properties available at the moment.
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Check Again
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <>
            <div className="mt-14">
                <main className="flex-1">
                    {/* ---------------- HERO SECTION ---------------- */}
                    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
                        <img
                            src={landfing}
                            alt="Luxury Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 drop-shadow-2xl">
                                Luxury <span className="italic font-serif">Living</span>
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
                                Exceptional residences in the world's finest locations
                            </p>
                            <button className="bg-white text-black px-8 py-3 text-lg font-medium rounded-sm hover:bg-gray-100 transition-colors duration-300 shadow-xl">
                                Explore Properties
                            </button>
                        </div>
                    </section>

                    {/* ---------------- FEATURED PROPERTIES ---------------- */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-light text-center mb-12">
                                Curated <span className="italic font-serif">Properties</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.results.map((item) => (
                                    <PropertyCard 
                                        apartment={item} 
                                        key={item.id} 
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                {/* Lead Modal */}
                <LeadModal
                    apartment={selectedApartment}
                    show={showModal}
                    onClose={closeModal}
                />
            </div>
        </>
    );
}

export default Home;

//
// ---------------- PROPERTY CARD COMPONENT ----------------
//
function PropertyCard({ apartment, onViewDetails }) {
    const [index, setIndex] = useState(0);
    const images = apartment.images || [];

    // Helper function for full URL
    const getImageUrl = (path) => {
        if (!path) return '';
        // Check if it's already a full URL
        if (path.startsWith('http')) return path;
        return `${process.env.REACT_APP_API_URL || ''}${path}`;
    };

    // Auto-slide logic
    useEffect(() => {
        if (images.length <= 1) return;
        
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Handle image error
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* CAROUSEL */}
            <div className="relative w-full h-64 overflow-hidden">
                {images.length > 0 ? (
                    <>
                        <div
                            className="flex h-64 transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {images.map((img) => (
                                <img
                                    key={img.id}
                                    src={getImageUrl(img.image)}
                                    alt={`${apartment.name} - Image ${img.sequence}`}
                                    className="w-full h-64 object-cover flex-shrink-0"
                                    onError={handleImageError}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows - Only show if multiple images */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/60 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                                    }}
                                >
                                    ‹
                                </button>

                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/60 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIndex((prev) => (prev + 1) % images.length);
                                    }}
                                >
                                    ›
                                </button>
                            </>
                        )}

                        {/* DOTS INDICATOR - Only show if multiple images */}
                        {images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            index === i ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIndex(i);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    // Fallback when no images
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No images available</span>
                    </div>
                )}
            </div>

            {/* CARD CONTENT */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
                            {apartment.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {apartment.location || 'Location not specified'}
                        </div>
                    </div>
                    <div className="text-right ml-4">
                        <span className="text-2xl font-light text-gray-900">
                            ₹{parseInt(apartment.price || 0).toLocaleString('en-IN')}
                        </span>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                            Total
                        </div>
                    </div>
                </div>

                {/* AMENITIES */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {apartment.amenities?.slice(0, 3).map((amenity) => (
                            <div 
                                key={amenity.id} 
                                className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-200"
                            >
                                {amenity.logo && (
                                    <img
                                        src={getImageUrl(amenity.logo)}
                                        alt={amenity.name}
                                        className="w-3 h-3 mr-2 object-contain"
                                        onError={handleImageError}
                                    />
                                )}
                                <span className="text-xs text-gray-700 font-medium">
                                    {amenity.name}
                                </span>
                            </div>
                        ))}
                        {(!apartment.amenities || apartment.amenities.length === 0) && (
                            <span className="text-xs text-gray-500">No amenities listed</span>
                        )}
                    </div>
                    {apartment.amenities && apartment.amenities.length > 3 && (
                        <div className="text-xs text-gray-500 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            +{apartment.amenities.length - 3} more amenities
                        </div>
                    )}
                </div>

                {/* VIEW DETAILS BUTTON */}
                <button 
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    onClick={() => onViewDetails(apartment)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

// Fallback property card for error state
function FallbackPropertyCard() {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="w-full h-64 bg-gray-300"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}