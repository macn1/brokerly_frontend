import React from 'react'
import city from '../../assets/city.jpg'
import { FiArrowUpRight } from "react-icons/fi";
import section from '../../assets/city/section.jpg'
import pune from '../../assets/city/pune.jpg'
import image1 from '../../assets/city/image1.png'
import image2 from '../../assets/city/image2.png'
import image3 from '../../assets/city/image3.png'
import image4 from '../../assets/city/image4.png'
import image5 from '../../assets/city/maha.jpg'

import { useNavigate } from 'react-router-dom';
function CulturalCity() {
    const navigate = useNavigate()

    return (
        <>
            <section className="bg-[#F5E9D6] relative">
                <div
                    className="flex items-center min-h-[60vh] sm:min-h-[60vh] md:min-h-[100vh] bg-cover bg-center relative animate-bgSlideUp"
                    style={{ backgroundImage: `url(${city})` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="w-full max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="animate-h1 font-['Raleway'] font-bold text-2xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wider">
                            CULTURAL CITY TOUR OF PUNE
                        </h1>
                        <h2 className="animate-h2 font-['Rufina'] font-normal text-xl md:text-2xl text-[#F5F3F1] mb-12 max-w-3xl mx-auto leading-relaxed">
                            Walk Through The Traditions, Stories, And Heritage Of Pune
                        </h2>
                        <button onClick={() => { navigate('/apartments') }} className="animate-btn flex items-center gap-2 mx-auto bg-[#5B656F] hover:bg-slate-600 text-white font-['Raleway'] py-3 px-8 md:py-4 md:px-10 rounded-lg duration-300 text-lg tracking-wide">
                            Book Your Apartment
                            <FiArrowUpRight className="text-xl" />
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className="bg-gradient-to-b from-[#F5E9D6] to-[#F5F3F1] py-10 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                            <div className="space-y-6">
                                <h2 className="text-4xl lg:text-5xl font-normal text-gray-800 leading-tight font-[Lora]">
                                    WHERE HERITAGE
                                    <br />
                                    MEETS TOMORROW
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed font-[Rufina]">
                                    The Hallowed Grounds Of The Maratha Empire To A Buzzing Tech And Educational Hub, Pune Is A City Where
                                    Ancient Forts Stand Alongside Contemporary Art Galleries, And Timeless Traditions Thrive Alongside A
                                    Vibrant Modern Culture.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="rounded-tl-[50px] rounded-br-[50px]  overflow-hidden shadow-2xl">
                                    <img
                                        src={section}
                                        alt="Historic palace with Indo-Saracenic architecture"
                                        className="w-full h-80 object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center lg:space-y-20  ">
                            <div className="flex flex-col-reverse lg:flex-col items-center md:max-w-4xl  mx-auto lg:space-y-8  ">
                                <div className="relative w-full mx-auto">
                                    <div className="rounded-bl-[40px] rounded-tr-[40px]   md:rounded-bl-[60px] md:rounded-tr-[60px] overflow-hidden shadow-2xl mt-10 lg:mt-0">
                                        <img
                                            src={pune}
                                            alt="Traditional red colonial building with decorative elephants"
                                            className="w-full md:h-[400px] h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="max-w-3xl mx-auto md:space-y-4 text-center  ">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 font-[Lora]">Pune: The Cultural Capital</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed font-[Rufina]">
                                        Travel In Comfort And Style With AJ Hospitality Chauffeur Services. Leave The Hassle Of Driving Behind And
                                        Let Us Take You Smoothly To Your Destination. Relax In Our Luxury Four-Seater Sedan Or Our Spacious
                                        Six-Seater MPV, Both Designed For A Stress-Free Journey. The Chauffeur Service Only Operates In The Pune
                                        And Mumbai Areas Of Maharashtra.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" bg-gradient-to-b from-[#F5F3F1] to-[#F5E9D6]">
                <div className='py-16 px-6 max-w-6xl mx-auto'>

                    <div className="text-center mb-12">
                        <h2 className="md:text-5xl text-3xl font-[600] text-gray-800 mb-2 font-[Raleway]">Featured Attractions</h2>
                        <p className="text-[#181D24] font-[400] text-xl font-[Rufina]">Discover The Landmarks That Tell Pune's Story</p>
                    </div>
                    <div className="space-y-12">
                        <div className="flex flex-col lg:flex-row items-center  bg-white hover:bg-[#F5E9D6] shadow-xl rounded-tl-[50px] rounded-br-[50px]  md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px] transition-colors duration-300 delay-300">
                            <div className="flex-shrink-0 w-full lg:w-auto">
                                <img
                                    src={image1}
                                    alt="PreHab Museum"
                                    className="w-full h-80 object-cover rounded-tl-[50px] rounded-br-[50px] md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]"
                                />
                            </div>
                            <div className="flex-1 space-y p-8 ">
                                <h3 className="text-2xl font-[500] text-[#181D24] font-[Raleway py-2">Prabhat Museum</h3>
                                <p className="text-[#252323] leading-relaxed text-sm font-[Rufina]">
                                    Established in 1995, Prabhat Museum thrives on its inheritance from Prabhat Studio, and was opened to the public in 2008, before which visitation was reserved for VIPs and dignitaries. Housing a treasure of historical film memorabilia from Prabhat Studios—including photographs, posters, costumes, equipment, original contracts and musical instruments—the collection at the museum showcases a bygone era of Indian filmmaking.
                                </p>
                                <div className="pt-2 ">
                                    <p className="text-[#FF822F]  text-sm font-[700]">Entry Fee: ₹50/Indians</p>
                                    <p className="text-[#FF822F] text-sm font-[700] ">Entry Fee: ₹250/Foreign Nationals</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 bg-white  hover:bg-[#F5E9D6] transition-colors duration-300 delay-300  shadow-xl rounded-tl-[50px] rounded-br-[50px]  md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]">
                            <div className="flex-shrink-0 w-full lg:w-auto">
                                <img
                                    src={image2}
                                    alt="Aga Khan Palace"
                                    className="w-full h-80 object-cover rounded-tl-[50px] rounded-br-[50px] md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]"
                                />
                            </div>
                            <div className="flex-1 p-8">
                                <h3 className="text-2xl font-[500] text-[#181D24] font-[Raleway py-2">Aga Khan Palace</h3>
                                <p className="text-[#252323] leading-relaxed text-sm font-[Rufina]">
                                    One of the most significant landmarks of the Indian freedom movement, Pune’s Aga Khan Palace is an elegant mansion built in 1892 by Sultan Aga Khan III. A must-visit for history-buffs, the palace’s interiors display photographs, personal objects, and possessions of Mahatama Gandhi. It served as a prison for Mahatama Gandhi and Sarojini Naidu during the British rule in 1942-43, and also houses a mausoleum of Kasturba Gandhi (Mahatama Gandhi’s wife).
                                </p>
                                <div className="pt-2">
                                    <p className="text-[#FF822F]  text-sm font-[700]">
                                        Entry Fee: ₹5/Indians
                                    </p>
                                    <p className="text-[#FF822F]  text-sm font-[700]">
                                        Entry Fee: ₹100/Foreign Nationals
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center  bg-white  hover:bg-[#F5E9D6] transition-colors duration-300 delay-300 shadow-xl rounded-tl-[50px] rounded-br-[50px]  md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]">
                            <div className="flex-shrink-0 w-full lg:w-auto">
                                <img
                                    src={image3}
                                    alt="PreHab Museum"
                                    className="w-full h-80 object-cover rounded-tl-[50px] rounded-br-[50px] md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]"
                                />
                            </div>
                            <div className="flex-1 space-y p-8 ">
                                <h3 className="text-2xl font-[500] text-[#181D24] font-[Raleway py-2">Osho Commune</h3>
                                <p className="text-[#252323] leading-relaxed text-sm font-[Rufina]">
                                    Immerse yourself in the serenity of the Osho Commune International. An ashram founded by Rajneesh Chandra Mohan Jain, and more popularly known as Osho, the Osho Commune International is situated in Koregaon Park and is most widely known for the meditation courses it offers. Steal yourself from the bustle and noise of the city and experience the unique serenity of its environs.
                                </p>
                                <div className="pt-2 mt-4">
                                    <p className="text-[#FF822F]  text-sm font-[700]">Entry Fees For Digital Photo: ₹100</p>
                                    {/* <p className="text-[#FF822F] text-sm font-[700] ">Entry Fee: ₹250/Foreign Nationals</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 bg-white  hover:bg-[#F5E9D6] transition-colors duration-300 delay-300 shadow-xl rounded-tl-[50px] rounded-br-[50px]  md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]">
                            <div className="flex-shrink-0 w-full lg:w-auto">
                                <img
                                    src={image4}
                                    alt="Aga Khan Palace"
                                    className="w-full h-80 object-cover rounded-tl-[50px] rounded-br-[50px] md:rounded-none md:rounded-tr-[50px] md:rounded-bl-[50px]"
                                />
                            </div>
                            <div className="flex-1 p-8">
                                <h3 className="text-2xl font-[500] text-[#181D24] font-[Raleway py-2">Raja Dinkar Kelkar Museum</h3>
                                <p className="text-[#252323] leading-relaxed text-sm font-[Rufina]">
                                    Immerse yourself in the serenity of the Osho Commune International. An ashram founded by Rajneesh Chandra Mohan Jain, and more popularly known as Osho, the Osho Commune International is situated in Koregaon Park and is most widely known for the meditation courses it offers. Steal yourself from the bustle and noise of the city and experience the unique serenity of its environs.                                </p>
                                <div className="pt-2">
                                    <p className="text-[#FF822F]  text-sm font-[700]">
                                        Entry Fees: ₹120/Indians
                                    </p>
                                    <p className="text-[#FF822F]  text-sm font-[700]">
                                        Entry Fee: ₹300/Foreign Nationals                                     </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:py-14 py-10'>
                        <button onClick={() => { navigate('/apartments') }} className="animate-btn flex items-center gap-2 mt-10 mx-auto bg-[#5B656F] hover:bg-slate-600 text-white font-['Raleway'] py-3 px-8 md:py-4 md:px-10 rounded-lg duration-300 text-lg tracking-wide">
                            Book Your cultural tour
                            <FiArrowUpRight className="text-xl" />
                        </button>
                    </div>
                </div>

            </section>
            <section className="bg-gradient-to-b from-[#F5E9D6] to-[#F5F3F1] md:py-16 py-0 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl  text-[#1D221B] mb-4 text-balance font-[Lora] font-[600] ">
                        The Cultural Capital of Maharashtra
                    </h1>

                    <p className="text-lg  mb-12 max-w-2xl mx-auto text-[#1D221B] font-[Rufina]">
                        Discover a city rich in history, alive with art, and buzzing with innovation.
                    </p>
                    <div className="relative  mb-10 ">
                        <img
                            src={image5}
                            alt="Scenic highway cutting through the hills and valleys of Maharashtra"
                            className="w-full h-[400px] md:h-[500px] object-cover md:rounded-tr-[80px] md:rounded-bl-[80px] md:rounded-none rounded-tr-[50px] rounded-bl-[50px]  shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </>

    )
}

export default CulturalCity
