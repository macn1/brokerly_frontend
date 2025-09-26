import React from 'react'
import Landing from "../../assets/landing.jpg"
import kingston from "../../assets/apartments/kingston.jpg"
import lodha from '../../assets/apartments/lodha.jpg'
import raheja from '../../assets/apartments/raheja.jpg'
import victoria from '../../assets/apartments/victoria.jpg'
import conceirge from '../../assets/icons/concr.png'
import chef from '../../assets/icons/chef.png'
import vaccum from '../../assets/icons/vaccum.png'
import award from '../../assets/icons/award.png'

import Host from '../../assets/host.jpg'
import family from '../../assets/family.jpg'

import { useNavigate } from "react-router-dom";
function Home() {

    const navigate = useNavigate();
    const apartments = [
        {
            id:23,
            name: "Kingston Atlantis",
            location: "Mohammadwadi, Pune India",
            image: kingston
        },
        {
            id:25,
            name: "Lodha Bellavita",
            location: "Mohammadwadi, Pune India",
            image: lodha,
        },
        {
            id:23,
            name: "Raheja Vista",
            location: "Coming Soon",
            image:victoria ,
        },
        {
            id:26,
            name: "Victoria",
            location: "Liverpool City Center, UK",
            image: raheja,
        },
    ]
    return (
        <>
            <section className="bg-[#F5F3F1] ">
                <div
                    className="min-h-[60vh] sm:min-h-[60vh] md:min-h-[100vh] bg-cover bg-center relative"

                    style={{ backgroundImage: `url(${Landing})` }}
                >
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4
                                   md:bg-[linear-gradient(to_right,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)]"
                    >
                        <h1
                            className="font-thin  text-xl md:text-[40px] text-[#181D24] animate-slide-up"
                            style={{
                                textShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                                animation: 'slideUp 2s ease-out forwards'
                            }}
                        >
                            A TAILOR-MADE STAY, MEETINGS YOUR NEED
                        </h1>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            <section>
                <main className="">

                    <section className="py-16 px-4 bg-[#F5E9D6]">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                   <h2 className="text-3xl font-semibold text-[#181D24] mb-6 md:hidden text-center" style={{ fontFamily: "Rufina" }}>
                                   Your Apartments
                                </h2>
                        <h2
                            className="hidden md:block  text-4xl lg:text-5xl font-semibold text-[#181D24] mb-6" style={{ fontFamily: "Rufina" }}
                        >
                          Your Apartments
                        </h2>
                                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-[rufina]">
                                    Stunningly maintained apartments equipped with all your essentials and more. Your own private concierge &
                                    chauffeur, keeping you comfortable and stress free both in and outside of your apartment.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {apartments.map((apartment, index) => (
                                    <div
                                        key={index}
                                         onClick={() => navigate("/apartments", { state: { name: apartment.name,apartmentId:apartment.id } })}
                                        className="relative group overflow-hidden rounded-br-[40px] rounded-tl-[40px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <img
                                                src={apartment.image || "/placeholder.svg"}
                                                alt={`${apartment.name} apartment`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="text-lg font-semibold mb-1 text-balance">{apartment.name}</h3>
                                                <p className="text-sm text-gray-200 text-pretty">{apartment.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

            </section>
            <section>
                <div className="bg-gradient-to-b from-[#F5F3F1] to-[#F5E9D6] 
                md:from-[#F5F3F1] md:to-[#F5F3F1]">


                    <div className="text-center  py-10">
                        <h2 className="text-3xl font-semibold text-[#181D24] mb-6 md:hidden text-center" style={{ fontFamily: "Rufina" }}>
                                   Your Comforts
                                </h2>
                        <h2
                            className="hidden md:block  text-4xl lg:text-5xl font-semibold text-[#181D24] mb-6" style={{ fontFamily: "Rufina" }}
                        >
                            Your Comforts
                        </h2>
                        <div className="  md:flex md:justify-center mx-auto  gap-2 md:gap-20 md:divide-x divide-[#C9BDAB] py-6">
                            {[
                                {
                                    icon: conceirge,
                                    title: "Concierge Manager",
                                    subtitle: "Know more",
                                },
                                {
                                    icon: award,
                                    title: "Luxury Apartments",
                                    subtitle: "Know more",
                                },
                                {
                                    icon: vaccum,
                                    title: "Chauffeur Service",
                                    subtitle: "charge your car",
                                },
                                {
                                    icon: chef,
                                    title: "Personalized F&B",
                                    subtitle: "work out",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex md:flex-col md:items-center md:justify-center items-start gap-4 md:px-4 px-10 py-6 text-left md:text-center border-b md:border-b-0 rounded-md md:bg-transparent shadow-sm md:shadow-none"
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="h-6 w-6 opacity-70"
                                    />
                                    <div className="md:mt-4">
                                        <h3 className="font-semibold text-[#181d24] text-base font-serif">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-[#7e7e7e] flex items-center md:justify-center gap-1">
                                            {item.subtitle}
                                            <span className="ml-1">→</span>
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <section  className=" py-8 px-4">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 ">
                            {/* Content Container - Always first on mobile */}
                            <div className="w-full md:w-[45%] px-2 md:px-8 order-1 ">
                                {/* Mobile Heading */}
                                <h2 className="text-3xl font-semibold text-[#181D24] mb-6 md:hidden text-center" style={{ fontFamily: "Rufina" }}>
                                    Your Host,
                                </h2>

                                {/* Desktop Heading */}
                                <h2 className="hidden md:block text-4xl lg:text-5xl font-semibold text-[#181D24] mb-6" style={{ fontFamily: "Rufina" }}>
                                    Your Host,
                                </h2>

                                <div className="space-y-4 text-[#181D24]">
                                    <p className="text-sm md:text-base" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        Firstly, thank you for visiting our page, India holds a very special place in my heart and with that the
                                        culture and tranquility the city offers is something that kept drawing me back to her and eventually
                                        starting a family and settling.
                                    </p>

                                    <p className="text-sm md:text-base" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        I've spent the better part of the last thirty years watching our city grow expediently. If you visited ten
                                        years ago, you'd be overwhelmed with this grown-up 2025 version.
                                    </p>

                                    <p className="text-sm md:text-base" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        It's important you get the most out of your trip when staying with us. Personally, I enjoy my comfort and
                                        convenience and this in essence is what our hospitality is all about
                                    </p>

                                    <p className="text-sm md:text-base" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        We have a driver to take you around and our concierge on the phone for any questions or assistance you may
                                        need. Our tailored F&B services are designed to give you that diet your used too or require if you are
                                        coming for medical reasons.
                                    </p>

                                    <p className="text-sm md:text-base mt-6" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        In short, "the final details" are really  the DNA behind our services and offerings, indeed our apartments are well sort after,rest assured when you stay with us you're a proper guest. What I need you to feel when you head home from an enjoyable stay, is happiness.
                                    </p>

                                    <p className="text-sm md:text-base" style={{ fontFamily: "Raleway", fontWeight: "500" }}>
                                        I look forward to welcoming you during your visit. My Team and I are here to ensure your stay with us is just
                                        right!
                                    </p>

                                    <p className="text-base md:text-lg mt-6 font-semibold" style={{ fontFamily: "Raleway" }}>
                                        Alexander Johnson
                                    </p>
                                </div>

                              
                            </div>
                            <div className="w-full md:w-[55%] relative flex justify-center  order-2 mb-10">
                                <div className="relative  max-w-md ">
                                    <img
                                        src={family}
                                        alt="Alexander Johnson"
                                        className="w-[400px] max-w-xs md:max-w-full ml-[44px] sm:ml-32  md:ml-16  rounded-tr-[40px] md:rounded-tr-[50px] mx-auto  px-0 md:px-0  mb-6 "
                                    />
                                    <img
                                        src={Host}
                                        alt="Group of friends"
                                        className="absolute -bottom-6 md:-left-36 -left-5 md:-bottom-3 md:-right-6  max-w-[500px] md:h-[300px] md:w-[250px] w-[200px]  rounded-bl-[25px] md:rounded-bl-[40px] border-4 md:border-8 border-[#F5F3F1]  "
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </section>
        </>

    )
}

export default Home
