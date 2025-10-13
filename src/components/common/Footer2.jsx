import React, { useState } from "react";
import LetsConnectLandscapeImg from "../../assets/lets_connect_landscape.png";
import LetsConnectVerticalImg from "../../assets/lets_connect_vertical.png";
import faacebbok from "../../assets/icons/facebook.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import ytb from "../../assets/icons/ytb.png";
import figma from "../../assets/icons/figma.png";
import net from "../../assets/icons/net.png";
import logo from "../../assets/logo.png";
import { useCreateContactMutation } from "../../store/api/bookings";
import { useNavigate } from "react-router-dom";
import mobilefooter from "../../assets/mobilefoot.jpg";

const Footer = () => {
    const [createContact] = useCreateContactMutation();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        termsandcondition: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createContact(formData).unwrap();
            alert("Message sent successfully!");
            setFormData({
                name: "",
                email: "",
                message: "",
                termsandcondition: false,
            });
        } catch (error) {
            console.error("Contact submission error:", error);
            alert("Failed to send message.");
        }
    };

    return (
        <footer className="h-screen flex flex-col">

            <div className="hidden h-[800px] bg-[#F5E9D6] md:flex items-center mt-">
                {/* <div className="max-w-7xl mx-auto px-4 w-full md:px-[55px]">
                    <div className="bg-white p-6 rounded-br-[40px] shadow-2xl  -mb-12 relative z-20">
                        <h2
                            className="text-[24px] text-center font-semibold mb-6 text-[#181D24]"
                            style={{ fontFamily: "Rufina" }}
                        >
                            We’d love to hear from you
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Your Name"
                                className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                                style={{ fontFamily: "Raleway", fontWeight: 500 }}
                                required
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                                className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                                style={{ fontFamily: "Raleway", fontWeight: 500 }}
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                                className="w-full border-b border-gray-300 bg-transparent outline-none py-2 resize-none placeholder-[#5B656F]"
                                style={{ fontFamily: "Raleway", fontWeight: 500 }}
                                required
                            />
                            <div className="flex flex-col">
                                <label
                                    className="text-sm"
                                    style={{ fontFamily: "Raleway", fontWeight: 400 }}
                                >
                                    <input
                                        name="termsandcondition"
                                        type="checkbox"
                                        checked={formData.termsandcondition}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    I accept the Terms and conditions
                                </label>
                                <button
                                    type="submit"
                                    className="w-[150px] h-[48px] bg-[#5B656F] text-white px-6 py-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] hover:bg-black transition mt-10"
                                >
                                    <span
                                        className="text-white text-[16px] leading-[24px] font-semibold uppercase tracking-[0]"
                                        style={{ fontFamily: "Raleway", fontWeight: "600" }}
                                    >
                                        SEND
                                    </span>
                                </button>
                            </div>
                        </form>
                     </div>
                </div> */}
            </div>
            <div className="block md:hidden relative bg-[#DFE3E7]">
                    <div
                      className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-right"
                      style={{
                        backgroundImage: `url(${mobilefooter})`,
                        backgroundPosition: "75% center",
                      }}
                    />
                    <div className="relative z-10 px-2 py-10">
                      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
            
            
            
                        <div className="bg-white p-6 rounded-br-[40px] shadow-md">
                          <h2
                            className="text-[24px] text-center font-semibold mb-6 text-[#181D24]"
                            style={{ fontFamily: "Rufina" }}
                          >
                            We’d love to hear from you
                          </h2>
                          <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              type="text"
                              placeholder="Your Name"
                              className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                              style={{ fontFamily: "Raleway", fontWeight: 500 }}
                            />
                            <input
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email"
                              placeholder="Email"
                              className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                              style={{ fontFamily: "Raleway", fontWeight: 500 }}
                            />
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Message"
                              rows={4}
                              className="w-full border-b border-gray-300 bg-transparent outline-none py-2 resize-none placeholder-[#5B656F]"
                              style={{ fontFamily: "Raleway", fontWeight: 500 }}
                            />
                            <label
                              className="text-sm"
                              style={{ fontFamily: "Raleway", fontWeight: 400 }}
                            >
                              <input
                                name="termsandcondition"
                                type="checkbox"
                                checked={formData.termsandcondition}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              I accept the Terms and conditions
                            </label>
                            <button
                              type="submit"
                              className="w-full h-[48px] bg-[#5B656F] text-white px-6 py-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] hover:bg-black transition"
                            >
                              <span
                                className="text-white text-[16px] leading-[24px] font-semibold uppercase"
                                style={{ fontFamily: "Raleway", fontWeight: "600" }}
                              >
                                SEND
                              </span>
                            </button>
                          </form>
                        </div>
                        <div className="bg-[#181D24] text-white p-8 rounded-tr-[40px] shadow-lg text-center">
                          <h2
                            className="font-bold mb-6 text-[28px]"
                            style={{ fontFamily: "Rufina", color: "#F5E9D6" }}
                          >
                            Reservation’s
                          </h2>
                          <div className="grid grid-cols-2 gap-y-4 w-full max-w-[336px] text-left text-[13px] mx-auto">
                            <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>
                              Phone
                            </h4>
                            <p style={{ fontFamily: "Raleway" }}> +91 8530255598</p>
                            <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>
                              Email
                            </h4>
                            <p style={{ fontFamily: "Raleway" }}>hospitality@ajpgroup.com</p>
                            <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>
                              Address
                            </h4>
                            <p
                              className="col-span-2 leading-relaxed"
                              style={{ fontFamily: "Raleway" }}
                            >
                             Block-2, Kingston Atlantis, Shankarrao Madhukar Ghule Patil Rd
                              <br />
                              Mohammed Wadi, Pune, Maharashtra 411060
                            </p>
                            <div className="flex gap-4 mt-3 mb-3 col-span-2 justify-center">
                              <img src={faacebbok} alt="fb" className="w-5 h-5" />
                              <img src={whatsapp} alt="wa" className="w-5 h-5" />
                              <img src={ytb} alt="yt" className="w-5 h-5" />
                              <img src={figma} alt="fig" className="w-5 h-5" />
                              <img src={net} alt="net" className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

            {/* Bottom 50% with white background */}
            <div className="h-1/2 bg-[#DFE3E7]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm p-6 px-7 md:px-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2 md:mt-10">
                            <img src={logo} alt="AJP Logo" className="h-10  w-10 md:h-[30px] md:w-[30px]" />
                            <h4
                                className="text-[20px] leading-[24px] font-medium tracking-[2px] uppercase text-[#181D24]"
                                style={{ fontFamily: 'Raleway' }}
                            >
                                AJP GROUP
                            </h4>
                        </div>

                        <p className="text-[#5B656F] text-sm leading-relaxed mt-5" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                    AJ Hospitality LLP, Is a legally registered trademarked firm. All Rights Reserved.    

                        </p>
                    </div>

                    <div className="flex flex-col gap-2 ml-0 md:ml-0 lg:ml-[170px] md:mt-10">
                        <h4 className="font-bold text-base mb-1 text-[#181D24]" style={{ fontFamily: 'Raleway', fontWeight: 700 }}>
                            Connect with us
                        </h4>
                        <p className="text-sm text-[#181D24]" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                           +91 8530255598
                        </p>
                        <a
                            href="mailto:info@ajpgroup.com"
                            className="text-sm text-[#181D24] underline"
                            style={{ fontFamily: 'Raleway', fontWeight: 400 }}
                        >
                           hospitality@ajpgroup.com
                        </a>
                        <div className='flex gap-4 md:px- mt-3   mb-3 '>
                            <img src={faacebbok} alt="fb" className='w-5 h-5' />
                            <img src={whatsapp} alt="fb" className='w-5 h-5' />
                            <img src={ytb} alt="fb" className='w-5 h-5' />
                            <img src={figma} alt="fb" className='w-5 h-5' />
                            <img src={net} alt="fb" className='w-5 h-5' />
                        </div>
                        <div className="flex gap-6">
                            <h3 onClick={() => { navigate('/terms-and-condition') }}  className="cursor-pointer hover:underline">Terms</h3>
                            <h3  className="cursor-pointer hover:underline">Privacy</h3>
                            <h3 onClick={() => { navigate('/contact-us') }} className="cursor-pointer hover:underline">Contact</h3>
                        </div>
                        <p className="text-[12px] text-[#5B656F] mt-2" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                            AJP GROUPS | © All rights reserved 2022–2023
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
