import React, { useState } from "react";
import Contact from "../../assets/contact.jpg";
import ajp from "../../assets/ajp.jpg";
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

    const faqItems = [
        {
            question: "How safe and secure are my apartments?",
            answer: `All our apartments have external CCTV with an optional camera in the living room
of the apartment for those wanting extra security. The buildings are housed to a
number of residents and tenants with 24-hour security alarms or personal patrolling.
You will be given a key/access card to move freely within the common areas at your liberty.`,
        },
        {
            question: "How many people can stay in my apartment?",
            answer: `Our Lohda apartment can accommodate 4 guests.
Our Kingston apartment can accommodate 6 guests.
Our studio apartment in Liverpool can accommodate 2 guests.`,
        },
        {
            question: "How well located is my apartment?",
            answer: `Both Lodha & Kingston Apartments:
- 10 Min Drive To Ruby Hall Hospital (Wanowrie)
- 20 Min Drive to MG Road
- 35 Min Drive to Koregoan Park
- 50 Min Drive to Baner
- 40 Min Drive to Pune Airport
- 3hr50 Min Drive To Mumbai Airport
These apartments are located within 10-minute walking distance from Tribeca & Dorabjee Mall. 
Liverpool accommodation is in prime city centre with a lock-box code provided for check-in.`,
        },
        {
            question: "What is included in the price of Accommodation?",
            answer: `A dedicated Concierge, car and driver, plus services listed on the apartments page.
Liverpool apartment is fully furnished but does not include concierge or chauffeur services.`,
        },
        {
            question: "Does my apartment have a concierge, what is he there for?",
            answer: `Yes, your apartment is looked after by Ian Langley, available for booking goods, 
food, restaurants, or coordinating with your driver. 
(Not available for Liverpool accommodation).`,
        },
        {
            question: "Is my chauffeur and vehicle included in the room rates?",
            answer: `Yes, available 9:00am–5:00pm daily (except Sundays). 
Overtime charges apply. Vehicle is limited to Pune City only. 
(Not available for Liverpool accommodation).`,
        },
        {
            question: "Can I cancel/change the Accommodation dates after payment?",
            answer: `You can cancel within 24 hours of payment. 
You can change dates free of cost up to 72 hours before your stay, subject to availability. 
No refunds if your new dates cannot be accommodated.`,
        },
    ];

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
                                        <p className="text-white/90">hospitality@ajpgroup.com</p>
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

                {/* About Section */}
                {/* <section className="bg-gradient-to-b from-[#F5E9D6] to-[#F5F3F1] py-8 px-6 md:px-12 lg:px-20">
                    <div className="max-w-6xl">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-medium text-[#313131] font-[Raleway]">
                                ABOUT AJ GROUP
                            </h2>
                        </div>
                        <div className="grid lg:grid-cols-2 items-start py-4">
                            <p className="text-[#252323] leading-relaxed text-base font-[Raleway]">
                                AJ Group Is Dedicated To Offering Seamless Hospitality, Travel,
                                And Lifestyle Services Tailored To Every Guest's Needs. From
                                Premium Medical Tourism Support And Chauffeur-Driven Travel To
                                Cultural City Tours And Concierge Assistance, We Ensure Every
                                Journey Is Smooth, Safe, And Memorable. With Trusted Partners And
                                Decades Of Expertise, AJ Group Stands For Reliability, Care, And
                                Excellence.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto mt-6">
                        <img
                            src={ajp}
                            alt="Outdoor terrace with stone walls and wooden pergola featuring wicker furniture in a Mediterranean style setting"
                            className="w-full h-[400px] rounded-tl-[50px] rounded-br-[50px] shadow-lg object-cover"
                        />
                    </div>
                </section> */}

                {/* FAQ Section */}
                <section className="py-16 px-6 bg-gradient-to-b from-[#F5F3F1] to-[#F5E9D6]">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-4">
                            <span className="text-sm font-medium text-stone-600 uppercase tracking-wide font-[Lora]">
                                F&Q
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium text-[#313131] mb-12 font-[Raleway]">
                            GOT ANY QUESTIONS?
                        </h2>

                        <div className="bg-[#F5E9D6] px-10 py-10 rounded-lg">
                            <div className="space-y-6">
                                {faqItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-stone-300 group cursor-pointer transition-colors duration-200"
                                    >
                                        <div
                                            onClick={() => toggleFAQ(index)}
                                            className="flex items-center justify-between py-2 px-4 hover:bg-orange-50 rounded-lg"
                                        >
                                            <p className="text-stone-700 text-base font-medium leading-relaxed font-[Raleway]">
                                                {item.question}
                                            </p>
                                            <svg
                                                className={`w-5 h-5 text-stone-600 transition-transform duration-200 ${openIndex === index ? "rotate-90" : ""
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                        {openIndex === index && (
                                            <div className="px-4 pb-4 text-stone-600 text-sm leading-relaxed">
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Contactus;
