import React from 'react'
import aboutus from '../../assets/about-us1.png'
import blur from '../../assets/blur1.png'
import Host from '../../assets/host.jpg'
import Apartment from '../../assets/apartment.jpg'
import About1Img from "../../assets/about1.png";
import About2Img from "../../assets/about2.png";
function About() {
    return (
        <>
            <div className="w-full md:h-screen bg-cover bg-center " style={{ backgroundImage: `url(${blur})` }}>
                <div className="flex flex-col md:flex-row  p-4">
                    <div className=" md:w-[650px] md:h-[380px] w-[400px] h-[350px] flex items-center justify-center mt-32 md:px-20 md:ml-16">
                        <img
                            src={aboutus}
                            alt="Scenic View"
                            className="w-[614px] h-full object-cover rounded-br-[80px] "
                        />
                    </div>
                    <div className="w-full md:w-[460px] h-[400px]   mt-10 md:mt-32  ">
                        <h1 className='md:text-5xl text-2xl font-[Rufina] px-8 md:px-0 text-[#181D24]'>Lorem ipsum dolor sit amet consectetur.</h1>
                        <p className='font-[Raleway] px-2 md:px-0 mt-5 md:mt-10 text-[#181D24]'>Lorem ipsum dolor sit amet consectetur. A elit netus sed tortor. At velit in elit mauris phasellus magna. Proin lectus nullam aliquam mi dolor. Pulvinar a aenean urna condimentum sed id ut in pretium.</p>
                        <p className='font-[Raleway]  px-2 md:px-0 mt-5 md:mt-10 text-[#181D24]'>Tempus fames velit nec sapien tortor sit duis lectus sit. Elementum urna neque at dolor. Aliquet lorem malesuada suspendisse adipiscing</p>
                        <p className='font-[Raleway] px-2 md:px-0 mt-5 md:mt-10 text-[#181D24]'>venenatis. Tincidunt urna ut turpis placerat massa aliquam sit viverra. Ut viverra semper feugiat risus enim egestas. Diam urna enim rutrum ut sit. Fusce nisi eget id lorem dignissim id donec risus. Magna tempor dui mauris ipsum nisl eu auctor sollicitudin mauris. Vestibulum vulputate.</p>
                    </div>
                </div>
            </div>
            <section className="bg-gradient-to-b from-white-300 to-white-400 py-8 px-4 mb-[40px]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-[72px]  ">
                    <h2
                        className="text-3xl font-semibold text-[#181D24] mb-0 md:mb-6 text-center md:hidden"
                        style={{ fontFamily: "Rufina" }}
                    >
                        About Us,
                    </h2>
                    <div className="w-full md:w-1/2 relative flex justify-center items-center order-2 md:order-2 mt-10 md:mt-32">
                        <img
                            src={About1Img}
                            alt="Woman by the pool"
                            className="
                 w-[75%] 
                 md:mb-10
                 sm:w-[80%] 
                 md:w-[300px]
                 md:h-[400px]
                 lg:w-[400px] 
                 object-cover 
                 rounded-tr-[30px]
                 md:rounded-tr-[50px]
                 ml-150px
                 md:ml-[100px]
                 md:mr-[80px]
               
               "
                        />

                        <img
                            src={About2Img}
                            alt="Group of friends"
                            className="
                        
                 rounded-bl-3xl
                 md:rounded-bl-[50px]
                 absolute 
                 -top-[68px]
                 sm:-top-10 
                 md:-top-[80px] 
                 left-2/5
                 md:left-1/2 
                 -translate-x-1/2 
                 w-[47%] 
                 sm:w-[180px] 
                 md:w-[260px] 
                 ml-[10px] 
                 sm:-ml-[100px] 
                 md:-ml-[100px] 
                 md:h-[350px]
                 border-r-[10px] 
                 border-b-[10px] 
                 border-[#F5F3F1] 
             
               "
                        />
                    </div>
                    <div className="w-full md:w-[65%] order-3 md:order-1 px-0 md:px-20 mt-4">
                        <h2
                            className="hidden md:block text-5xl md:text-4xl font-semibold text-[#181D24] mb-4  m"
                            style={{ fontFamily: "Rufina" }}
                        >
                            About Us,
                        </h2>

                        <p
                            className="text-[#181D24] mb-4  text-sm px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >
                            Firstly, thank you for visiting our page, India holds a very special place in my heart and with that the culture and tranquility the city offers is something that kept drawing me back to her and eventually starting a family and settling
                        </p>
                        <p
                            className="text-[#181D24] mb-4  text-sm  px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >
                            I’ve spent the better part of the last thirty years watching our city grow expediently, if you visited ten years ago, you’d be overwhelmed with this grown-up 2025 version.
                        </p>
                        <p
                            className="text-[#181D24] mb-4  text-sm  px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >
                            It’s important you get the most out of your trip when staying with us. Personally, I enjoy my comfort and convenience and this in essence is what my hospitality evolves around.
                        </p>
                        <p
                            className="text-[#181D24]  text-sm  px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >
                            We have a driver to take you around and our concierge on the phone for any questions or assistance you may need. Our tailored F&B services are designed to give you that diet your used too or require if you are coming for medical reasons
                        </p>

                        <p
                            className="text-[#181D24]  text-sm mt-2 px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >I look forward to welcoming you during your visit.  Team and I are here to ensure your stay with us is just right!

                        </p>
                        <p
                            className="text-[#181D24] md:text-base text-sm mt-2 px-3 md:px-0"
                            style={{ fontFamily: "Raleway", fontWeight: "500" }}
                        >
                            Alexander Johnson
                        </p>
                        <div
                            className="bg-[#DFE3E7] text-center text-[#181D24]  py-3 rounded-md mt-6 text-sm md:text-base font-medium mt-[50px] px-8 md:px-0"
                            style={{ fontFamily: "Rufina", fontWeight: "400" }}
                        >
                            We strive to offer you best possible homes to stay.
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default About
