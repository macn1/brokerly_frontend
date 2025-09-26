import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation } from "react-router-dom";
import booking_process from "../../assets/booking_process.png";
import { FiMapPin } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { FaCcVisa, FaCcPaypal, FaApplePay, FaCcMastercard } from "react-icons/fa";
const Bookings = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation();
    const { apartmentName, location: address, checkIn, setCheckIn, checkOut, setCheckOut, main,price } = location.state || {};
    const baseUrl = process.env.REACT_APP_API_URL.replace("/api", "");
    console.log(main, price,price,
        "apartmen12t"
    );
    const [openSection, setOpenSection] = useState(1);
    const toggleSection = (section) => setOpenSection((prev) => (prev === section ? null : section));
    const countries = [
        { code: "US", dial: "+1" },
        { code: "IN", dial: "+91" },
        { code: "UK", dial: "+44" },
        { code: "CA", dial: "+1" },
        { code: "AU", dial: "+61" },
    ];
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phone, setPhone] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("credit");

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[80px] sm:mt-[90px]">
                <div className="space-y-4">
                    <div className="border rounded-lg shadow-sm overflow-hidden">
                        <button onClick={() => toggleSection(1)} className="w-full px-4 sm:px-6 py-4 text-base sm:text-lg flex justify-between items-center font-semibold text-[#484848]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>
                            1. Contact Information <span>{openSection === 1 ? "−" : "+"}</span>
                        </button>
                        {openSection === 1 && (
                            <div className="px-6 pb-6 space-y-4">
                                <form className="space-y-6 text-sm text-[#181D24]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block mb-1 font-medium text-[#344054]"
                                                style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                placeholder="olivia@untitledui.com"
                                                className="w-full border border-gray-300 rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block mb-1 font-medium text-[#344054]"
                                                style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                            >
                                                Surname
                                            </label>
                                            <input
                                                type="text"
                                                style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                placeholder="olivia@untitledui.com"
                                                className="w-full border border-gray-300 rounded px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-1 text-sm font-medium text-[#344054]"
                                            style={{ fontFamily: "Raleway", fontWeight: 600 }}
                                        >
                                            Telephone number
                                        </label>
                                        <div className="flex border border-gray-300 rounded overflow-hidden">
                                            <select
                                                value={selectedCountry.code}
                                                onChange={(e) => {
                                                    const selected = countries.find(
                                                        (c) => c.code === e.target.value
                                                    );
                                                    setSelectedCountry(selected);
                                                }}
                                                className="px-2 py-2 text-sm bg-gray-100 focus:outline-none"
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="px-2 py-2 text-sm text-gray-500 bg-gray-50 border-l border-gray-300 flex items-center">
                                                {selectedCountry.dial}
                                            </span>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="(555) 000-0000"
                                                className="flex-1 px-3 py-2 text-sm focus:outline-none "
                                                style={{ fontFamily: "Raleway", fontWeight: 600 }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-1 font-medium text-[#344054]"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                            placeholder="olivia@untitledui.com"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 font-medium text-[#344054]"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                        >
                                            Are you coming alone?
                                        </label>
                                        <div className="flex gap-6">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="alone"
                                                    className="accent-[#181D24]"
                                                    style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                />
                                                Yes
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="alone"
                                                    className="accent-[#181D24]"
                                                    style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                />
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                            placeholder="If No, Specify"
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-1 font-medium text-[#344054]"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                        >
                                            Purpose of Visit
                                        </label>
                                        <textarea
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                            placeholder="Enter a description..."
                                            className="w-full border border-gray-300 rounded px-3 py-2"
                                            rows={3}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label
                                            className="block mb-2 font-medium text-[#344054]"
                                            style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                        >
                                            Add Other Services
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {[
                                                "Wheelchair",
                                                "Special Assistance",
                                                "Special Diet",
                                                "Transportation",
                                                "Nurse/Doctor Visits",
                                                "Visa Assistance",
                                                "Visa Assistance",
                                                "Cultural Tour",
                                                "Dental",
                                            ].map((service, index) => (
                                                <label key={index} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="accent-[#181D24]"
                                                        style={{ fontFamily: "Raleway", fontWeight: "500" }}
                                                    />
                                                    {service}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className="border rounded-lg shadow-sm">
                        <button onClick={() => toggleSection(2)} className="w-full px-4 sm:px-6 py-4 text-base sm:text-lg flex justify-between items-center font-semibold text-[#484848]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>
                            2. Payment <span>{openSection === 2 ? "−" : "+"}</span>
                        </button>
                        {openSection === 2 && (
                            <div className="space-y-8 p-6 bg-white rounded-lg shadow-md text-sm">
                                <div>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <button
                                            onClick={() => setSelectedMethod("credit")}
                                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${selectedMethod === "credit" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                                }`}
                                        >
                                            <FaCcVisa className="text-2xl" />
                                            <span style={{ fontFamily: "Raleway", fontWeight: "600" }}>Visa</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedMethod("apple")}
                                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${selectedMethod === "apple" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                                }`}
                                        >
                                            <FaApplePay className="text-2xl" />
                                            <span style={{ fontFamily: "Raleway", fontWeight: "600" }}>Apple Pay</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedMethod("paypal")}
                                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${selectedMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                                }`}
                                        >
                                            <FaCcPaypal className="text-2xl" />
                                            <span style={{ fontFamily: "Raleway", fontWeight: "600" }}>PayPal</span>
                                        </button>
                                    </div>
                                    {selectedMethod === "credit" && (
                                        <div className="space-y-4">
                                            <p className="font-medium" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Credit Card</p>
                                            <p className="text-gray-500 text-sm" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Mastercard, Visa, American Amex</p>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Card number</label>
                                                <div className="relative">
                                                    <FaCcMastercard className="absolute left-3 top-3 text-xl text-red-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="Card number"
                                                        style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                        className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block mb-1 text-sm font-medium" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-sm font-medium" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Security number</label>
                                                    <input
                                                        type="text"
                                                        placeholder="XXX"
                                                        style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" id="remember" className="accent-blue-600" />
                                                <label htmlFor="remember" className="text-sm" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Remember my payment details</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex justify-end">
                                        <button className="bg-[#25409C] hover:bg-[#1e3480] text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto" style={{ fontFamily: "Raleway", fontWeight: "600" }}>
                                            Confirm and Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border rounded-lg shadow-sm">
                        <button onClick={() => toggleSection(3)} className="w-full px-4 sm:px-6 py-4 text-base sm:text-lg flex justify-between items-center font-semibold text-[#484848]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>
                            3. Legal & Cancellation Policy <span>{openSection === 3 ? "−" : "+"}</span>
                        </button>
                        {openSection === 3 && (
                            <div className="px-6 pb-6">
                                <div className="space-y-10 text-[#181D24] text-sm">

                                    <section>
                                        <h2 className="text-base font-bold mb-4 font-[Raleway]">
                                            Legal & Cancellation Policy
                                        </h2>
                                        <ol className="list-decimal list-inside space-y-2 font-[Rufina]">
                                            <li>
                                                An agreement known as a Leave and Licence agreement will
                                                need to be signed by the guest upon arrival. The licence
                                                entitles you to stay in the property for the duration of
                                                your time with us. The agreement is valid for a minimum of
                                                three months.
                                            </li>
                                            <li>
                                                A termination letter for the agreement must be signed on
                                                the last day of stay.
                                            </li>
                                            <li>
                                                Free cancellation within 24 hours of receiving
                                                confirmation and payment.
                                            </li>
                                            <li>
                                                No refunds after 24 hours of receiving payment under any
                                                circumstances.
                                            </li>
                                            <li>
                                                Changes to perks or add-ons must be confirmed pre-arrival.
                                                No changes post-arrival.
                                            </li>
                                            <li>
                                                AJH holds the right to terminate the agreement if policies
                                                or society rules are violated.
                                            </li>
                                            <li>
                                                Drafts of our L&L, NOC & Termination letter will be signed
                                                upon arrival on the first day.
                                            </li>
                                        </ol>
                                    </section>
                                    <section>
                                        <h2 className="text-base font-bold mb-4 font-[Raleway]">
                                            Details About  Kingston-Apartments

                                        </h2>
                                        <ul className="list-disc list-inside space-y-2 font-[Rufina]">
                                            <li>
                                                3 Bed Rooms
                                            </li>
                                            <li>OTT TV with cabinet and free WiFi</li>
                                            <li>Sofa for 3 people</li>
                                            <li>Ambient lighting and ceiling spotlights</li>
                                            <li>
                                                OneTouch 7” security screen & CCTV inside and outside door
                                            </li>

                                            <li>
                                                Fully Fitted Kitchen

                                            </li>
                                            <li>3 Bathrooms
                                            </li>
                                            <li>8-hour power backup</li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h2 className="text-base font-bold mb-4 font-[Raleway]">
                                            Details About  Lodha-Apartments
                                        </h2>
                                        <ul className="list-disc list-inside space-y-2 font-[Rufina]">
                                            <li>
                                                2 Bed Rooms
                                            </li>
                                            <li>OTT TV with cabinet and free WiFi</li>
                                            <li>Sofa for 3 people</li>
                                            <li>Ambient lighting and ceiling spotlights</li>
                                            <li>
                                                OneTouch 7” security screen & CCTV inside and outside door
                                            </li>

                                            <li>
                                                Fully Fitted Kitchen

                                            </li>
                                            <li>2 Bathrooms
                                            </li>
                                            <li>8-hour power backup</li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h2 className="text-base font-bold mb-4 font-[Raleway]">
                                            Amenities Inside the Society
                                        </h2>
                                        <p className="text-red-600">
                                            Guests are not permitted to use amenities like gyms, courts,
                                            pools, cafes, or restaurants. They are for residents and
                                            members only.
                                        </p>
                                    </section>
                                    <section>
                                        <h2 className="text-base font-bold mb-4 font-[Raleway]">Chauffeur Services</h2>
                                        <p className="font-[Rufina]">
                                            Enjoy a stress-free ride in our luxury 4-seater sedan or
                                            6-seater MPV. Our highly trained chauffeurs ensure comfort
                                            and safety.
                                        </p>
                                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2 font-[Rufina]">
                                            <li>Airport Transfers / Pick Ups</li>
                                            <li>Corporate Travel for executives and meetings</li>
                                            <li>Special Events: weddings, birthdays, etc.</li>
                                            <li>Sightseeing Tours around the city</li>
                                        </ul>
                                        <div className="mt-3">
                                            <p>
                                                <strong>Rates:</strong>
                                            </p>
                                            <ul className="list-disc list-inside ml-4 font-[Rufina]">
                                                <li>Luxury 4-seater sedan – $188/hour</li>
                                                <li>Comfortable 6-seater MPV – $158/hour</li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="border rounded-lg shadow-sm p-4 sm:p-6">
                    <img
                        src={
                            main?.find((img) => img.sequence === "1")?.image
                                ? `${baseUrl}${main.find((img) => img.sequence === "2")?.image}`
                                : "/placeholder.jpg"
                        }
                        alt="Apartment"
                        className="w-full h-[220px] sm:h-[260px] object-cover rounded-md mb-4"
                    />

                    <h4 className="text-lg sm:text-xl font-semibold mb-1 text-[#484848]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>{apartmentName}</h4>
                    <p className="text-[#6C6B6B] mb-3 flex items-center gap-1 text-[13px] md:text-[14px]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>
                        <FiMapPin className="h-4 w-4" /> {address}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-[#344054]" style={{ fontFamily: "Raleway", fontWeight: "600" }}>Check In:</label>
                            <div className="relative">
                                <DatePicker selected={checkIn} onChange={setCheckIn} dateFormat="dd MMM, yyyy" className="w-full border border-gray-300 rounded px-3 py-2 pl-9 text-[#667085]" style={{ fontFamily: "Raleway", fontWeight: "600" }} />
                                <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" style={{ fontFamily: "Raleway", fontWeight: "600" }} />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#344054]" style={{ fontFamily: "Raleway", fontWeight: "600" }} >Check Out:</label>
                            <div className="relative">
                                <DatePicker selected={checkOut} onChange={setCheckOut} dateFormat="dd MMM, yyyy" className="w-full border border-gray-300 rounded px-3 py-2 pl-9 text-[#667085]" style={{ fontFamily: "Raleway", fontWeight: "600" }} />
                                <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" style={{ fontFamily: "Raleway", fontWeight: "600" }} />
                            </div>
                        </div>
                    </div>
                  <div className="text-sm space-y-2 mt-4">
  <p
    className="font-semibold text-[#484848]"
    style={{ fontFamily: "Raleway", fontWeight: "600" }}
  >
    Price Details:
  </p>

  {/* Apartment Price */}
  <p style={{ fontFamily: "Raleway", fontWeight: "400" }}>
    Apartment Price:{" "}
    <span
      className="float-right text-[#484848]"
      style={{ fontFamily: "Raleway", fontWeight: "400" }}
    >
      ₹{price}
    </span>
  </p>

  {/* Security Deposit */}
  <p style={{ fontFamily: "Raleway", fontWeight: "400" }}>
    Security Deposit:{" "}
    <span
      className="float-right text-[#484848]"
      style={{ fontFamily: "Raleway", fontWeight: "400" }}
    >
      ₹48,000
    </span>
  </p>
  <p className="text-xs text-gray-500 ml-2" style={{ fontFamily: "Raleway" }}>
  ( Security deposit is refundable)
  </p>
  <hr />
  <p
    className="font-bold"
    style={{ fontFamily: "Raleway", fontWeight: "600" }}
  >
    Total:{" "}
    <span
      className="float-right text-[#484848]"
      style={{ fontFamily: "Raleway", fontWeight: "600" }}
    >
      ₹{Number(price) + 48000}
    </span>
  </p>
</div>

                </div>
            </div>
        </div>
    );
};

export default Bookings;
