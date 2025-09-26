import React from 'react'
import { useNavigate } from 'react-router-dom'
function Terms() {
    const navigate = useNavigate()
    return (
        <div className='bg-[#F5F3F1] h-full'>
            <div className='md:mt-14 mt-20 '>
                <section className="max-w-2xl mx-auto py-16 px-4 text-[#1E1E1E] font-sans ">
                    <p className="text-center text-sm text-gray-500 uppercase tracking-wide mb-2">
                        Current as of Sep 2025
                    </p>
                 
                    <h2 className="text-3xl font-semibold text-[#181D24] mb-6 md:hidden text-center" style={{ fontFamily: "Rufina" }}>
                       Terms & Conditions
                    </h2>
                    <h2
                        className="hidden md:block   text-center text-4xl lg:text-5xl font-semibold text-[#181D24] mb-6" style={{ fontFamily: "Rufina" }}
                    >
                      Terms & Conditions
                    </h2>

                    <div className="space-y-10 mt-5 ">
                        <div>
                            <h2 className="text-[28px] font-[700] mb-2 font-[Rufina] text-[#181D24] text-center">Apartments</h2>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]   ">
                                1. Leave and Licence agreement will need to be signed by our guests upon arrival. The licence entitles you to stay in the property for the duration of your time with us. The agreement is valid for a minimum of three months and is based on your visa. This is handed over to the authorities and is part of a legal requirement.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                2. Free cancellation within 24 hours of receiving confirmation and payment.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                3. No refunds after 24 hours of receiving payment under any circumstances, including date changes or apartment add-on services taken.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                4. AJH holds the right to terminate the agreement if policies or society rules are violated by our guests.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                5. Drafts of our L&L that include an NOC & Termination letter will be signed upon arrival on the first day. These will be presented to you when you arrive.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                6. There will be an excess of ₹48000 held on your card until you check out. This is held in case of any damages that may or may not occur during your stay. We hold the right to retain this deposit with explanation should our property be violated in any way with costs to repair needed.
                            </p>

                        </div>

                        <div>
                            <h2 className="text-[28px] font-[700] mb-2 font-[Rufina] text-[#181D24] text-center">Medical</h2>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px] ">
                                1. We are not responsible for any treatments, operations, or bookings you may have had via our reference or contact.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                2. We act as intermediaries with the sole role of introducing you to the right hospital, doctors, nurses, or any medical professionals. AJH and its staff cannot be held responsible for any unforeseeable circumstances, including illness, death, compensation, or inconvenience.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                3. We do not allow any treatment to be administered or practiced on the property; all medical procedures must be done in a hospital.
                            </p>
                            <p className="text-[#181D24] leading-relaxed font-[Raleway] text-[12px]">
                                4. In the event of incapacity or death on our property, we will support our guests in a dignified manner but are not responsible for arranging logistics, ceremonies, or compensation.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-[28px] font-[700] mb-2 font-[Rufina] text-[#181D24] text-center">Chauffeur</h2>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px] ">
                                1. During your time in our vehicle, in the unlikely event of an accident, our vehicle is insured for passengers up to ₹48000 each for medical/hospital bills if necessary.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                2. Our chauffeur is on duty from 9-5pm Monday–Saturday; additional hours are chargeable, including overtime.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                3. Any violence or bullying of our driver is strictly prohibited; we reserve the right to cancel the car and driver without refund if such behavior occurs.
                            </p>
                            <p className="text-[#181D24] leading-relaxed mb-2 font-[Raleway] text-[12px]">
                                4. Please inform our team immediately if you encounter any issues with our driver or vehicle.
                            </p>
                        </div>

                        {/* You can continue adding sections for additional items like "Travel insurance" etc. using the same format */}

                    </div>
                </section>

                <div className='md:px-40 px-9 md:py-20 '>
                    <div className='w-full text-center py-10 bg-white rounded-br-[70px] md:rounded-none'>
                        <div className='flex justify-center'>
                            <h2 className='mt-1 font-[Rufina] font-[700] text-3xl max-w-64 md:max-w-full'>Still have questions?</h2>
                        </div>
                        <p className='mt-3 font-[Raleway] px-6'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                        <button onClick={() => { navigate('/contact-us') }} className='bg-[#5B656F] text-white px-6 py-2 mt-4'>Get In Touch</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terms
