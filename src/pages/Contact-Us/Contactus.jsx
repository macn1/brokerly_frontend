import React, { useState } from "react";
import Contact from "../../assets/contact.jpg";

import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
function Contactus() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        emailAddress: "",
        message: "",
    });

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <>
            <div>
                {/* Hero Section */}
                <section
                    className="min-h-screen bg-cover bg-center bg-no-repeat relative"
                    style={{
                        backgroundImage: `url(${Contact})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
                        <div className="grid lg:grid-cols-2 gap-12 md:items-start max-w-7xl mx-auto">
                            <div className="text-white flex flex-col justify-between h-full py-10">
                                <div className="space-y-4">
                                    <h1 className="text-4xl lg:text-5xl font-bold font-[Raleway] leading-snug lg:leading-tight">
                                        You Have Question,<br />We Have Answers
                                    </h1>
                                    <p className="text-lg text-white/90 leading-relaxed max-w-sm mx-auto md:mx-0">
                                        Get in touch with us for appointments, treatments, Apartments,
                                        or any dental queries — our team is just a call or message away.
                                    </p>
                                </div>

                                <div className="hidden md:flex flex-row gap-24 md:py-20 mt-8 md:mt-0">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <MdOutlineMail className="text-xl" />
                                            <span className="text-xl font-semibold">Email</span>
                                        </div>
                                        <p className="text-white/90">info@stackerbee.com</p>
                                    </div>
                                    <div>
                                         <div className="flex items-center gap-2 mb-2">
                                            <IoMdPhonePortrait  className="text-xl" />
                                            <span className="text-xl font-semibold">Contact</span>
                                        </div>
                                        
                                        <p className="text-white/90">+91 8530255598</p>
                                    </div>
                                </div>

                            </div>

                            {/* Contact Form */}
                            <div className="bg-gradient-to-b from-white to-[#F5E9D6] backdrop-blur-sm md:rounded-tr-[50px] rounded-bl-[30px] rounded-tr-[30px] md:rounded-bl-[50px] p-8 shadow-2xl">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[Raleway]">
                                        Tell Us What You Need
                                    </h2>
                                    <p className="text-gray-600 font-normal font-[Rufina]">
                                        Our team is here to help.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                                        />
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                                        />
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            placeholder="Email Address"
                                            value={formData.emailAddress}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                                        />
                                    </div>

                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all resize-none"
                                    ></textarea>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="w-full bg-[#5B656F] hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            Submit
                                            <FiArrowUpRight className="text-xl" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Contact info for mobile */}
                            <div className="md:hidden flex flex-row gap-24 px-5 mt-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white/90">
                                        Email
                                    </h3>
                                    <p className="text-white/90">hospitality@ajpgroup.com</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-white/90">
                                        Contact
                                    </h3>
                                    <p className="text-white/90">+91 8530255598</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

               
                
            </div>
        </>
    );
}

export default Contactus;
