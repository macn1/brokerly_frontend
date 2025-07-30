import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/calendar-custom.css"
import { enUS } from 'date-fns/locale';
import { FaPhoneAlt } from "react-icons/fa";
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
import { useGetAllAmenityQuery, useGetAllapartmentAmenityQuery, useGetApartmentByIdQuery, useGetAllApartmentsQuery } from '../../store/api/apartment'
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Apartments = () => {
  const [features, setFeatures] = useState([])
  const [aptamenity, setAptamenity] = useState()
  const [description, setDescription] = useState('')
  const [kingstonDescription, setKingstonDescription] = useState('')
  const [allAparmentsData, setAllApartmentsData] = useState([])
  const { data: apartmentsData, isLoading, isError } = useGetAllApartmentsQuery();
  const { data: amenityData } = useGetAllAmenityQuery();
  const { data: apartmentAmenity } = useGetAllapartmentAmenityQuery();
  const { data: lodhaaptData } = useGetApartmentByIdQuery(6);
  const { data: kingstonData } = useGetApartmentByIdQuery(7);

  useEffect(() => {
    if (apartmentsData) {
      setAllApartmentsData(Array.isArray(apartmentsData) ? apartmentsData : []);
    }
  }, [apartmentsData])
  useEffect(() => {
    if (kingstonData) {
      setAptamenity(lodhaaptData.amenities)
      setKingstonDescription(lodhaaptData.description)
    }
  }, [lodhaaptData])
  useEffect(() => {
    if (lodhaaptData) {
      setAptamenity(lodhaaptData.amenities)
      setDescription(lodhaaptData.description)
    }
  }, [lodhaaptData])

  useEffect(() => {
    if (amenityData) {
      const names = amenityData.map(item => item.name);
      setFeatures(names);
    }
  }, [amenityData]);
  const thumbnails = [small1, small2, small3, small4, small5, small6];


  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const dailyRate = 350;
  const start = selection[0].startDate;
  const end = selection[0].endDate;
  const dayDiff = differenceInDays(end, start);
  const total = dailyRate * dayDiff;

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
  navigate('/booking', {
    state: {
      apartmentName: apartment.name,
      location: apartment.location,
      checkIn: selection[0].startDate,
      checkOut: selection[0].endDate,
    
    },
  });
};
  return (
    <>
      <div className="relative">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${background})`,
            backdropFilter: "blur(250px)",
          }}
        >
        </div>
        <section className="relative z-10 py-4 px-4 md:px-12">
          {allAparmentsData.map((apartment) => (
            <div className="max-w-7xl mx-auto  mt-[72px] md:mt-[91px]">
              <div className="background-overlay">
                <div className="flex justify-between items-start mb-4 flex-wrap ">
                  <div>
                    <h1
                      className="font-semibold text-[#FFFFFF] text-[30px]"
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      {apartment.name}
                    </h1>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p
                      className="text-xl font-semibold text-[#FFFFFF] text-[10px] md:text-[20px] "
                      style={{ fontFamily: "Rufina", fontWeight: "700" }}
                    >
                      <span className="md:text-[30px] text-[20px]">$450</span>/ Bills included
                    </p>
                  </div>
                  <div className="text-white">
                    <p
                      className="md:text-sm text-xs flex items-center gap-2 mb-2"
                      style={{ fontFamily: "Rufina", fontWeight: "400" }}
                    >
                      <FiMapPin className="h-4 w-4 " />
                      {apartment.location}
                    </p>
                    <div className="flex flex-wrap md:gap-4 gap-1 ">
                      {features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white"
                          style={{ fontFamily: "Rufina", fontWeight: 400 }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 ">
                  <div className="md:col-span-7 relative">
                    <div
                      className="absolute top-[18px] left-[18px] bg-[#F5E9D6] text-[#181D24] text-xs px-3 py-2 rounded shadow"
                      style={{ fontFamily: "Raleway", fontWeight: "500" }}
                    >
                      From <b>$450 / daily</b>
                    </div>
                    <img
                      src={big1}
                      alt="Apartment"
                      className="w-full h-[280px] md:h-[380px] object-none rounded"
                    />
                  </div>
                  <div className="md:col-span-5 grid grid-cols-2 gap-1">
                    {thumbnails.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-28 md:h-[124px] object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
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
                              src={`http://127.0.0.1:8000${item.logo}`}
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
                        Apartment Rates
                      </h3>
                      <ul className="text-sm text-[#181D24] list-none space-y-1">
                        {apartment.facilities.filter((item) => item.type === "included").map((item, itx) => {
                          return (
                            <li
                              key={item.id}
                              className="text-[#181D24]"
                              style={{ fontFamily: "Raleway", fontWeight: "500" }}
                            >
                              <input
                                type="checkbox"
                                className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                              />
                              {item.name}
                            </li>
                          );
                        })}

                      </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4
                          className="font-semibold text-base mb-2 text-[#181D24]  text-[24px]"
                          style={{ fontFamily: "Rufina", fontWeight: "700" }}
                        >
                          Extra Services
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Carer : $18 Per hour
                          </li>
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Certified Nurse : $24 per hour (Min 4hours)
                          </li>
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Laundry : $4.80 per kil (Wash, dry and Iron)
                          </li>
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Food & Drink (Delivered Home, Call For)
                          </li>
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Baby Sitters : $8 per hour
                          </li>
                          <li
                            className="text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                            />
                            Luxury Car Hire $188 per hour (Alphard or S Class)
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4
                          className="font-semibold text-base mb-2 text-[#181D24]  text-[24px]"
                          style={{ fontFamily: "Rufina", fontWeight: "700" }}
                        >
                          Additional Services (Call for assistance)
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {apartment.facilities.filter((item) => item.type == 'additional').map((item) => {
                            return (
                              <li
                                className="text-[#181D24]"
                                style={{ fontFamily: "Raleway", fontWeight: "500" }}
                              >
                                <input
                                  type="checkbox"
                                  className="mr-2 w-[12px] h-[12px] rounded-[5px] border border-[#181D24] bg-[#D9D9D9] checked:bg-[#181D24] accent-[#181D24]"
                                />
                                {item.name}
                              </li>

                            )
                          }
                          )}
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
                      <div className="flex justify-between text-sm text-[#181D24] font-medium">
                        <p style={{ fontFamily: "Raleway", fontWeight: 500 }}>
                          From <span className="font-bold">€{dailyRate}</span> / daily
                        </p>
                        <p style={{ fontFamily: "Raleway", fontWeight: 500 }}>
                          Total for <span className="font-bold">{dayDiff}</span> nights
                          <span className="font-bold text-[#4B5563]"> €{total}</span>
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
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5088754581753!2d-122.42177868467868!3d37.7749292797591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5e0a3c7f%3A0x2c3b3dfd6f4c2c88!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1614090140584!5m2!1sen!2sus"
                          className="w-full h-full"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                        <h3
                          className="text-[#181D24] text-[18px] md:text-[28px] font-bold mb-6"
                          style={{ fontFamily: "Rufina" }}
                        >
                          Book Your Apartment
                        </h3>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
                          <button
                            className="flex items-center justify-center gap-2 bg-[#5B656F] text-white px-4 py-2 rounded-md hover:bg-[#374151] transition text-xs sm:text-sm w-full sm:w-auto"
                            style={{ fontFamily: "Raleway", fontWeight: 600 }}
                          >
                            CALL OWNER
                            <FaPhoneAlt className="h-4 w-4" />
                          </button>
                          <button  onClick={() => handleBooking(apartment)}
                            className="flex items-center justify-center gap-2 bg-[#5B656F] text-white px-4 py-2 rounded-md hover:bg-[#374151] transition text-xs sm:text-sm w-full sm:w-auto"
                            style={{ fontFamily: "Raleway", fontWeight: 600 }}
                          >
                            BOOK APARTMENT
                            <FiExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
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
