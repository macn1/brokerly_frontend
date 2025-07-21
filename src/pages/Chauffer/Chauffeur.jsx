import React from 'react';
import office from "../../assets/office.jpg";
import hand from "../../assets/handshake.png";
import aboutus from '../../assets/about-us1.png'
import chauffer from '../../assets/chauffer.jpg'
function Chauffeur() {

  const services = [
    {
      title: "Airport Transfers / Pick Ups",
      desc: "Sit back and relax after your flight and let our professional chauffeur handle your airport pickups and drop-offs, ensuring a smooth and stress-free experience for travelers.",
      img: "../../assets/chauffer.jpg",
    },
    {
      title: "Corporate Travel",
      desc: "AJ's chauffeur services are a popular choice for business travel, providing a comfortable and efficient way for Executives and employees to travel to meetings and conferences.",
      img: "../../assets/chauffer.jpg",
    },
    {
      title: "Special Events",
      desc: "Hire our Chauffeur service for Weddings, Birthdays and other special occasions, adding a touch of luxury and making the event even more memorable.",
      img: "../../assets/chauffer.jpg",
    },
    {
      title: "Sightseeing Tours",
      desc: "Our Chauffeur can guide our clients on personal tours of the city and surrounding areas, providing a comfortable and informative way to explore.",
      img: "../../assets/chauffer.jpg",
    },
  ]


  return (
    <>
      <div className=" w-full bg-[linear-gradient(to_bottom,_#F5F3F1,_#C9BDAB)]">
        <div className="md:flex">
          <div className="md:w-[50%]  md:h-screen h-full flex justify-center items-center text-center font-[Rufina] font-[700] mt-[120px] md:mt-0 ">
            <div className="max-w-[540px] px-4">
              <h2 className="md:text-6xl text-2xl">
                Take The Hassle Out Of Your Travels By Letting Our Chauffeur Services
              </h2>
            </div>
          </div>
          <div className="hidden w-full md:w-[50%]  md:flex justify-center items-center mt-24 md:mt-0 ">
            <div className="relative flex sm:justify-center md:justify-start  items-center md:w-full h-full mt-10 md:mt-32  md:ml-0">
              <img
                src={office}
                alt="Woman by the pool"
                className="
                  md:w-[370px] 
                  md:h-[340px] 
                  object-cover 
                  mb-7
                  md:mb-0
                  rounded-tl-[30px]
                  md:rounded-tl-[90px] 
                  md:rounded-tr-[120px] 
                  md:rounded-br-[120px]
                  z-10"
              />
              <img
                src={hand}
                alt="Group of friends"
                className="
                  absolute 
                  top-[-40px] 
                  md:top-[-5px] 
                  left-
                  translate-x-1/2
                     w-[70px] 
                  sm:w-[70%] 
                  md:w-[380px] 
                  md:h-[300px] 
                  rounded-bl-[30px]
                  md:rounded-bl-none 
                  md:rounded-tr-[120px] 
                  border-l-[10px] 
                  border-b-[10px] 
                  border-[linear-gradient(to_bottom,_#F5F3F1,_#C9BDAB)] 
                  bg-transparent
                  z-20"
              />
            </div>
          </div>

        </div>
      </div>
      <div>
        <div className="w-full md:h-screen bg-cover bg-center bg-white "  >
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
      </div>
      <div className='bg-white h-full'>
        <h2 className='text-6xl text-center font-[Rufina] font-[700]'>Our Services Include</h2>
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="relative shadow-md rounded-xl overflow-hidden">
                <div className="relative w-full h-72 z-10">
                  <img
                    src={chauffer}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute bottom-14 right-0 w-[50px] h-[50px] bg-white overflow-hidden rounded-br-full z-30"></div> */}
                </div>
                <div className="bg-white p-6 pt-10 rounded-tl-[50px] z-30 relative -mt-[50px]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-700">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Chauffeur;
