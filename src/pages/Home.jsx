import background from "../assets/hero.png";
import Apartments1Img from "../assets/Apartments1.png";
import Apartments2Img from "../assets/Apartments2.png";
import About1Img from "../assets/about1.png";
import About2Img from "../assets/about2.png";

import SeafrontImg from "../assets/icons/Seafront.png";
import Pet_friendlyImg from "../assets/icons/Pet_friendly.png";
import Electric_carImg from "../assets/icons/Electric_car.png";
import FitnessImg from "../assets/icons/Fitness.png";
import BoatImg from "../assets/icons/Boat.png";
const Home = () => {
  return (
    <>
      <section className="bg-[#F5F3F1] mb-20">
        <div
          className="min-h-[100svh] bg-cover bg-center relative rounded-br-[40px] md:rounded-br-[100px]"
          style={{ backgroundImage: `url(${background})` }}
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
            <h1
              className="text-[32px] sm:text-[44px] md:text-[60px] leading-[44px] sm:leading-[56px] md:leading-[72px] font-bold uppercase tracking-tight"
              style={{ fontFamily: "Rufina", color: "#fff" }}
            >
              BE OUR GUEST
            </h1>
            <p
              className="w-full max-w-[480px] md:max-w-[420px] text-[13px] md:text-[20px] mt-4 bg-white text-[#C9BDAB] px-[2px] py-[2px] rounded-md uppercase tracking-wider backdrop-blur-sm"
              style={{ fontFamily: "Raleway" }}
            >
              LIVE LIKE A KING IN OUR BEST HOUSES
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#D5C5B5] py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2
            className="font-bold text-[20px] md:text-[32px] sm:text-[44px] md:text-[60px] leading-tight md:leading-[72px] tracking-normal text-[#181D24] uppercase text-center"
            style={{ fontFamily: "Rufina" }}
          >
            Our Apartments
          </h2>
          <p
            className="mt-4 md:mt-1 text-gray-700 max-w-xl mx-auto text-sm"
            style={{ fontFamily: "Raleway" }}
          >
            Fusce blandit magna eget felis dapibus, ac laoreet quam faucibus.
            Quisque feugiat felis a quam volutpat, non scelerisque nibh
            scelerisque.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden h-[610px] bg-cover bg-center rounded-tr-[40px] md:rounded-tr-[100px] rounded-bl-[40px] md:rounded-bl-[100px]"
              style={{ backgroundImage: `url(${Apartments1Img})` }}
            >
              {/* <div className="absolute inset-0 bg-black/30" /> */}
              <div className="absolute bottom-[48px] left-[48px] text-white">
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "rufina" }}
                >
                  Mountains
                </h3>
                <p className="text-sm text-left">87 properties</p>
              </div>
            </div>

            <div
              className="relative overflow-hidden h-[610px] bg-cover bg-center rounded-tl-[40px] md:rounded-tl-[100px] rounded-br-[40px] md:rounded-br-[100px]"
              style={{ backgroundImage: `url(${Apartments2Img})` }}
            >
              {/* <div className="absolute inset-0 bg-black/30" /> */}
              <div className="absolute bottom-[48px] left-[48px] text-white">
                <h3
                  className="text-2xl font-rufina font-semibold"
                  style={{ fontFamily: "rufina" }}
                >
                  Coastline
                </h3>
                <p className="text-sm text-left">64 properties</p>
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
            Our Properties Specialities
          </h2>
        </div>

        {/* Desktop Grid, Mobile Stack */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 md:divide-x divide-[#C9BDAB] mb-12">
          {[
            {
              icon: SeafrontImg,
              title: "Sea front",
              subtitle: "have a look",
            },
            {
              icon: Pet_friendlyImg,
              title: "Pet friendly",
              subtitle: "pets allowed",
            },
            {
              icon: Electric_carImg,
              title: "Electric car",
              subtitle: "charge your car",
            },
            {
              icon: FitnessImg,
              title: "Fitness/Gym",
              subtitle: "work out",
            },
            {
              icon: BoatImg,
              title: "Boat mooring",
              subtitle: "take a trip",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex md:block items-start gap-4 px-4 py-6 text-left md:text-center border-b md:border-b-0 rounded-md md:bg-transparent shadow-sm md:shadow-none"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="h-6 w-6 opacity-70 md:mx-auto mt-1 md:mt-0"
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-[72px]">
          {/* H2 Heading — Always on top */}
          <h2
            className="text-3xl font-semibold text-[#181D24] mb-0 md:mb-6 text-center md:hidden"
            style={{ fontFamily: "Rufina" }}
          >
            About Us
          </h2>

          {/* Image Section */}
          {/* <div className="w-full md:w-1/2 relative flex justify-center items-center order-2 md:order-2 mt-10 md:mt-10">
  <img
    src={About1Img}
    alt="Woman by the pool"
    className="
      w-[90%] 
      sm:w-[80%] 
      md:w-[360px] 
      lg:w-[400px] 
      object-cover 
      rounded-md
    "
  />

  <img
    src={About2Img}
    alt="Group of friends"
    className="
      absolute 
      -top-6 
      sm:-top-10 
      md:-top-16 
      left-1/2 
      -translate-x-1/2 
      w-[60%] 
      sm:w-[180px] 
      md:w-[260px] 
      -ml-[80px] 
      sm:-ml-[100px] 
      md:-ml-[200px] 
      border-r-[10px] 
      border-b-[10px] 
      border-[#F5F3F1] 
      rounded-md
    "
  />
</div> */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center order-2 md:order-2 mt-10 md:mt-10">
            {/* Bottom Image */}
            <img
              src={About1Img}
              alt="Woman by the pool"
              className="
      w-[75%] 
      sm:w-[80%] 
      md:w-[360px] 
      lg:w-[400px] 
      object-cover 
      rounded-md
      ml-[101px]
    "
            />

            {/* Top Overlapping Image */}
            <img
              src={About2Img}
              alt="Group of friends"
              className="
      absolute 
      -top-[68px]
      sm:-top-10 
      md:-top-[80px] 
      left-1/2 
      -translate-x-1/2 
      w-[55%] 
      sm:w-[180px] 
      md:w-[260px] 
      -ml-[55px] 
      sm:-ml-[100px] 
      md:-ml-[130px] 
      border-r-[10px] 
      border-b-[10px] 
      border-[#F5F3F1] 
      rounded-md
    "
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 order-3 md:order-1 px-0 md:px-20">
            {/* Desktop H2 hidden on mobile */}
            <h2
              className="hidden md:block text-3xl md:text-4xl font-semibold text-[#181D24] mb-4"
              style={{ fontFamily: "Rufina" }}
            >
              About Us
            </h2>

            <p
              className="text-[#181D24] mb-4 md:text-base"
              style={{ fontFamily: "Raleway", fontWeight: "500" }}
            >
              Lorem ipsum dolor sit amet consectetur. Eget mattis orci tortor
              mauris fringilla vitae. In velit auctor venenatis mattis
              suspendisse. Lectus tellus pretium fermentum duis congue cum enim
              sagittis.
            </p>
            <p
              className="text-[#181D24] mb-4 md:text-base"
              style={{ fontFamily: "Raleway", fontWeight: "500" }}
            >
              Sed velit pretium dui diam pellentesque. Eget at et rhoncus magna
              amet commodo. Facilisis vivamus ut amet enim nec. Adipiscing augue
              nunc auctor netus aliquet porttitor eu.
            </p>
            <p
              className="text-[#181D24] mb-4 md:text-base"
              style={{ fontFamily: "Raleway", fontWeight: "500" }}
            >
              Consequat dignissim sit at faucibus felis metus. Et pharetra
              interdum sit vestibulum vestibulum. Sociis nec faucibus molestie
              egestas cras ultricies libero. Est tempus tincidunt neque erat
              lobortis nunc id. Ullamcorper pretium mattis egestas enim
              elementum consectetur pharetra aliquam.
            </p>
            <p
              className="text-[#181D24] md:text-base"
              style={{ fontFamily: "Raleway", fontWeight: "500" }}
            >
              Montes in diam lectus sit non quis amet morbi volutpat.
            </p>

            <div
              className="bg-[#DFE3E7] text-center text-[#181D24] px-6 py-3 rounded-md mt-6 text-sm md:text-base font-medium mt-[50px]"
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
