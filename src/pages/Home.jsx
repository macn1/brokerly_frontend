import background from "../assets/hero.png";
import Landing from "../assets/landing.jpg"
import Apartments1Img from "../assets/Apartments1.png";
import Apartments2Img from "../assets/Apartments2.png";


import Host from '../assets/host.jpg'
import Apartment from '../assets/apartment.jpg'

import SeafrontImg from "../assets/icons/Seafront.png";
import Pet_friendlyImg from "../assets/icons/Pet_friendly.png";
import Electric_carImg from "../assets/icons/Electric_car.png";
import FitnessImg from "../assets/icons/Fitness.png";
import BoatImg from "../assets/icons/Boat.png";
const Home = () => {
  return (
    <>
      <section className="bg-[#F5F3F1] mb-5">
        <div
          className="min-h-[100svh] bg-cover bg-center relative rounded-br-[40px] md:rounded-br-[100px]"
          style={{ backgroundImage: `url(${Landing})` }}
        >
          {/* <div className="absolute inset-0 bg-black/30"></div> */}
          {/* <div className="absolute inset-0 bg-black/20"></div> */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(18, 38, 52, 0.4) 0%, rgba(18, 38, 52, 0) 100%)",
            }}
          >
            <h3
              className="font-thin  md:font-semibold text-xl text-[#181D24]"
              style={{
                textShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
              }}
            >
              A TAILOR-MADE STAY, MEETINGS YOUR NEEDS
            </h3>
          </div>
        </div>
      </section>
      <section className="bg-[#D5C5B5] py-10">
        <div className="text-center font-[Rufina]  font-bold  text-2xl  md:text-5xl  ">
          <h1>APARTMENTS</h1>
        </div>
        <div className=" flex justify-center py-5 md:py-10">
          <div className="text-center md:max-w-3xl text-sm">
            <p >Stunningly maintained apartments equipped with all your essentials and more. Your own private concierge & chauffer, keeping you comfortable and stress free both in and outside of your apartment. </p>
          </div>
        </div>
        <div>
          <div className="flex justify-center py-10 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] w-full px-10 md:px-3 ">
              <div
                className="relative overflow-hidden w-full h-[250px] md:h-[310px] bg-cover bg-red-400 bg-center  rounded-tr-[40px] md:rounded-tr-[40px] rounded-bl-[40px] md:rounded-bl-[40px]"
                style={{ backgroundImage: `url(${Apartments1Img})` }}
              >
                <div className="absolute bottom-[24px] left-[24px] text-white">
                  <h3 className="text-2xl font-semibold" style={{ fontFamily: "Rufina" }}>
                    Lodha Bellvita
                  </h3>
                  <p className="text-sm text-left">NIBM, Pune</p>
                </div>
              </div>

              <div
                className="relative overflow-hidden w-full h-[250px] md:h-[310px] bg-cover bg-center rounded-tl-[40px] md:rounded-tl-[40px] rounded-br-[40px] md:rounded-br-[40px]"
                style={{ backgroundImage: `url(${Apartments2Img})` }}
              >
                <div className="absolute bottom-[24px] left-[24px] text-white">
                  <h3 className="text-2xl font-semibold" style={{ fontFamily: "Rufina" }}>
                    Kingston Atlantis
                  </h3>
                  <p className="text-sm text-left">Mohammadwadi, Pune</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-[#F5F3F1] py-8 px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#181D24]"
            style={{ fontFamily: "Rufina" }}
          >
            Comforts
          </h2>
        </div>
        <div className="  md:flex md:justify-center mx-auto  gap-2 md:gap-20 md:divide-x divide-[#C9BDAB] mb-12">
          {[
            {
              icon: SeafrontImg,
              title: "Concierge Manager",
              subtitle: "Know more",
            },
            {
              icon: Pet_friendlyImg,
              title: "Luxury Apartments",
              subtitle: "Know more",
            },
            {
              icon: Electric_carImg,
              title: "Chauffeur Service",
              subtitle: "charge your car",
            },
            {
              icon: FitnessImg,
              title: "Personalized F&B",
              subtitle: "work out",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex md:flex-col md:items-center md:justify-center items-start gap-4 px-4 py-6 text-left md:text-center border-b md:border-b-0 rounded-md md:bg-transparent shadow-sm md:shadow-none"
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
      </section>

      <section className="bg-[#F5F3F1] py-8 px-4 mb-[40px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-[72px]  ">
          <h2
            className="text-3xl font-semibold text-[#181D24] mb-0 md:mb-6 text-center md:hidden"
            style={{ fontFamily: "Rufina" }}
          >
            Your Host,
          </h2>

          <div className="w-full md:w-1/2 relative flex justify-center items-center order-2 md:order-2 mt-10 md:mt-10">
            <img
              src={Apartment}
              alt="Woman by the pool"
              className="
      w-[75%] 
      md:mb-10
      sm:w-[80%] 
      md:w-[300px] 
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
              src={Host}
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
              Your Host,
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
  );
};
export default Home;
