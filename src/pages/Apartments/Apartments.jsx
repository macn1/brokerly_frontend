import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/calendar-custom.css"
import { enUS } from 'date-fns/locale';

// import { FaPhoneAlt } from "react-icons/fa";
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import background from "../../assets/apartments/bg.png";
import big1 from "../../assets/apartments/big1.png";
import small1 from "../../assets/apartments/small1.png";
import small2 from "../../assets/apartments/small2.png";
import small3 from "../../assets/apartments/small3.png";
import small4 from "../../assets/apartments/small4.png";
import small5 from "../../assets/apartments/small5.png";
import small6 from '../../assets/apartments/small6.jpg'
import button_icon from "../../assets/apartments/button_icon.png";
import { useGetAllAmenityQuery, useGetAllapartmentAmenityQuery, useGetApartmentByIdQuery, useGetAllApartmentsQuery, } from '../../store/api/apartment'
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaPhoneAlt } from "react-icons/fa";


const Apartments = () => {
  // const [features, setFeatures] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [aptamenity, setAptamenity] = useState()
  const [description, setDescription] = useState('')
  const [kingstonDescription, setKingstonDescription] = useState('')
  const [allAparmentsData, setAllApartmentsData] = useState([])
  const { data: apartmentsData, isLoading, isError } = useGetAllApartmentsQuery();
  const { data: amenityData } = useGetAllAmenityQuery();

  const location = useLocation();
  const selectedApartmentId = location.state?.apartmentId || null;
  const sectionRefs = useRef({});
  const phoneNumber = "+91 8530255598"

  const handleCallClick = () => {
    if (window.innerWidth <= 768) {
      // Mobile device -> directly open dialer
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // Large device -> show popup
      setShowPopup(true);
    }
  };


  console.log(selectedApartmentId, 'selectedApartmentId');


  useEffect(() => {
    if (apartmentsData) {
      setAllApartmentsData(Array.isArray(apartmentsData) ? apartmentsData : []);
    }
  }, [apartmentsData])


  useEffect(() => {
    if (selectedApartmentId && sectionRefs.current[selectedApartmentId]) {
      sectionRefs.current[selectedApartmentId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedApartmentId, allAparmentsData]);

  // useEffect(() => {
  //   if (amenityData) {
  //     const names = amenityData.map(item => item.name);
  //     setFeatures(names);
  //   }
  // }, [amenityData]);
  const thumbnails = [small1, small2, small3, small4, small5, small6];


  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const dailyRate = 172.79;
  const start = selection[0].startDate;
  const end = selection[0].endDate;
  const dayDiff = differenceInDays(end, start);
  const total = dailyRate * dayDiff;
  const baseUrl = process.env.REACT_APP_API_URL.replace("/api", "");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .rdrDayInRange, .rdrDayRangeStart, .rdrDayRangeEnd, .rdrDaySelected {
      background-color: #8998A6 !important;
      color: white !important;
    }
  `;
    document.head.appendChild(style);
  }, []);



  const navigate = useNavigate();
  const handleBooking = (apartment) => {
    console.log("andi", apartment);

    navigate('/booking', {
      state: {
        apartmentName: apartment.name,
        main: apartment.images,
        price:apartment.website_url,
        location: apartment.location,
        checkIn: selection[0].startDate,
        checkOut: selection[0].endDate,

      },
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div className="relative  bg-gradient-to-b from-[#F5F3F1] to-[#F5E9D6]">
        <section className="relative z-10 py-4 px-4 md:px-12">
          {allAparmentsData.map((apartment) => (
            <div key={apartment.id}
              ref={(el) => (sectionRefs.current[apartment.id] = el)} className="max-w-7xl mx-auto  mt-[72px] ">
              <div className="background-overlay">
                <div className=" items-start  ">
                  <div>
                    <h1
                      className="font-semibold text-[#2C2929] md:text-[30px] text-[20px]]"
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      {apartment.name}
                    </h1>
                  </div>
                  <div className="text-[#2C2929]">
                    <p
                      className="md:text-sm text-xs flex items-center gap-2 mb-2"
                      style={{ fontFamily: "Rufina", fontWeight: "400" }}
                    >
                      <FiMapPin className="h-4 w-4 " />
                      {apartment.location}
                    </p>

                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 ">
                  <div className="md:col-span-7 relative">
                    <div
                      className="absolute top-[18px] left-[18px] bg-[#F5E9D6] text-[#181D24] text-xs px-3 py-2 rounded shadow"
                      style={{ fontFamily: "Raleway", fontWeight: "500" }}
                    >
                      From <b>₹{apartment.website_url}/ daily</b>
                    </div>
                    {apartment.images && apartment.images.length > 0 && (
                      <img
                        src={`${baseUrl}${apartment.images.find(img => img.sequence === "1")?.image}`}

                        alt="Apartment"
                        className="w-full h-[380px] md:h-[380px] object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="md:col-span-5 grid grid-cols-2 gap-1">
                    {apartment.images && apartment.images
                      .filter(img => img.sequence !== "1")
                      .sort((a, b) => a.sequence - b.sequence)
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={`${baseUrl}${img.image}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-28 md:h-[124px] object-cover rounded"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-8">
                  <div>
                    <h2
                      className="text-lg font-semibold mb-4 text-[#181D24] text-[36px]"
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      Description
                    </h2>
                    <p
                      className="text-sm text-[#181D24] leading-relaxed"
                      style={{ fontFamily: "Raleway", fontWeight: "500" }}
                    >
                      {apartment.description}
                    </p>
                    <button
                      className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-[#5B656F] rounded-full hover:bg-[#374151] transition"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: "500",
                      }}
                    >
                      Show more
                      <img
                        src={button_icon}
                        alt="icon"
                        className="ml-1 w-[12px] h-[12px]"
                      />
                    </button>
                  </div>
                  <div className="mt-6">
                    <h3
                      className="text-lg font-semibold mb-4 text-[#181D24] text-[24px]"
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      Amenities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-800 ">
                      {apartment.amenities?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img
                            src={`${baseUrl}${item.logo}`}
                            alt={item.name}
                            className="w-4 h-5 object-contain"
                          />
                          <span
                            className="font-medium text-[#181D24] text-[13px]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2 text-[#181D24] text-[24px]"
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      Included Service
                    </h3>
                    <ul className="text-sm text-[#181D24] list-disc pl-5 space-y-1">
                      {apartment.facilities
                        .filter((item) => item.type === "included")
                        .map((item) => (
                          <li
                            key={item.id}
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            {item.name}
                          </li>
                        ))}
                      <div className="py-2">
                        <span className="text-[13px] text-[#181D24] ">Please contact us for rates & more information.</span>

                      </div>
                    </ul>


                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4
                        className="font-semibold text-base mb-2 text-[#181D24]  text-[24px]"
                        style={{ fontFamily: "Rufina", fontWeight: "700" }}
                      >
                        Additional Services
                      </h4>
                      <ul className="text-sm text-[#181D24] list-disc pl-5 space-y-1">
                        {apartment.etc_service

                          .map((item) => (
                            <li
                              key={item.id}
                              className="text-[#181D24]"
                              style={{ fontFamily: "Raleway", fontWeight: "500" }}
                            >
                              {`${item.name}`}

                            </li>
                          ))}
                      </ul>
                    </div>

                  </div>
                </div>
                <div className="md:col-span-5 space-y-10 w-full">
                  <div className="space-y-4 bg-transparent">
                    <h2
                      className="text-2xl font-bold text-[#181D24]"
                      style={{ fontFamily: "Rufina" }}
                    >
                      Availability
                    </h2>
                    <div className="w-full overflow-x-auto md:overflow-visible">
                      <div className="min-w-[500px] md:min-w-0">
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setSelection([item.selection])}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={selection}
                          direction="horizontal"
                          minDate={new Date()}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex bg-[#FFFFFF] justify-between text-sm text-[#181D24] font-medium px-4 py-4">

                      <p style={{ fontFamily: "Raleway", fontWeight: 500 }}>
                        From <span className="font-bold">₹{apartment.website_url}</span> / daily
                      </p>

                      <p style={{ fontFamily: "Raleway", fontWeight: 500 }}>
                        Total for <span className="font-bold">{dayDiff}</span> nights
                        <span className="font-bold text-[#4B5563]"> ₹{dayDiff * apartment.website_url}</span>
                      </p>
                    </div>
                  </div>
                  <div className="!mt-[13px] bg-transparent ">
                    <h2
                      className="text-[#181D24] text-[32px] font-bold  mt-[0px]"
                      style={{ fontFamily: "Rufina" }}
                    >
                      Location
                    </h2>
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-6 shadow-sm">
                      <iframe
                        title="Google Map Location"
                        src={
                          apartment?.address?.address_line && apartment.address.address_line.trim() !== ""
                            ? apartment.address.address_line
                            : "https://www.google.com/maps/?pb=!1m18!1m12!1m3!1d3784.2966597750674!2d73.91168087371894!3d18.470216870713354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebcdb68c9b29%3A0xaee7838a5b9159e4!2sLodha%20Bella%20Vita!5e0!3m2!1sen!2sus!4v1758866788782!5m2!1sen!2sus"
                        }
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 text-center shadow-sm bg-[#FFFFFF]">
                      <h3
                        className="text-[#181D24] text-[18px] md:text-[28px] font-bold mb-6"
                        style={{ fontFamily: "Rufina" }}
                      >
                        Book Your Apartment
                      </h3>

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
                        <button
                          onClick={handleCallClick}
                          className="flex items-center justify-center gap-2 bg-[#5B656F] text-white px-4 py-2 rounded-md hover:bg-[#374151] transition text-xs sm:text-sm w-full sm:w-auto"
                          style={{ fontFamily: "Raleway", fontWeight: 600 }}
                        >
                          CALL OWNER
                          <FaPhoneAlt className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleBooking(apartment)}
                          className="flex items-center justify-center gap-2 bg-[#5B656F] text-white px-4 py-2 rounded-md hover:bg-[#374151] transition text-xs sm:text-sm w-full sm:w-auto"
                          style={{ fontFamily: "Raleway", fontWeight: 600 }}
                        >
                          BOOK APARTMENT
                          <FiExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {showPopup && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
                        <div className="relative bg-white rounded-xl p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-gray-100">

                          {/* Close Icon */}
                          <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>

                          {/* Header with icon */}
                          <div className="mb-6">
                            <div className="w-12 h-12 bg-[#F5E9D6] rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-[#181D24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Owner</h2>
                            <p className="text-gray-600">Choose an action below</p>
                          </div>

                          {/* Phone Number Display */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                            <p className="text-xl font-semibold text-gray-900">{phoneNumber}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3">
                            <a
                              href={`tel:${phoneNumber}`}
                              className="bg-[#8998A6] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              Call Now
                            </a>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(phoneNumber);
                              }}
                              className="bg-[#DFE3E7] text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Number
                            </button>
                          </div>
                        </div>
                      </div>
                    )}


                  </div>
                </div>

              </div>

            </div>
          ))}
        </section>
      </div>
    </>
  );
};
export default Apartments;
