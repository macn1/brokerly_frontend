import LetsConnectLandscapeImg from "../../assets/lets_connect_landscape.png";
import LetsConnectVerticalImg from "../../assets/lets_connect_vertical.png";
import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="relative">
      <div
        className="hidden md:block w-full bg-cover bg-center bg-no-repeat relative "
        style={{
          backgroundImage: `url(${LetsConnectLandscapeImg})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 lg:gap-10 relative lg:py-32 top-[600px] md:top-[350px]">
          <div className="bg-[#181D24] text-white p-4 rounded-tr-[40px] lg:rounded-tr-[80px] w-full lg:w-[350px] flex flex-col items-center text-center shadow-lg">
            <h2
              className="font-bold mt-3 text-[28px] mt-16 md:text-[35px]"
              style={{
                fontFamily: "Rufina",
                color: "#F5E9D6",
                lineHeight: "1.2",
              }}
            >
              Reservation’s
            </h2>
            <div className="grid grid-cols-2 gap-y-4 max-w-[286px] text-left text-[8px] md:text-[9px] lg:text-[12px] mt-12 px-10 ">
              <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Phone</h4>
              <p style={{ fontFamily: "Raleway" }}>+91 9138295999</p>

              <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Email</h4>
              <p style={{ fontFamily: "Raleway" }}>info@ajpgroup.com</p>

              <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Address</h4>
              <p className="col-span-1 leading-relaxed" style={{ fontFamily: "Raleway" }}>
                S No 219/2/1B/1, Burhani Industrial Estate,<br />
                Kondhwa Budruk, Pune, Maharashtra 411048
              </p>

              <div className="flex gap-4 mt-4 text-lg col-span-2">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-whatsapp"></i>
              </div>
            </div>

          </div>

          <div className="bg-white p-6 lg:p-[48px] w-full lg:w-[800.266px] rounded-br-[40px] lg:rounded-br-[80px] shadow-md">
            <h2 className="text-[24px] md:text-[32px] lg:text-[38px] text-center lg:text-left font-semibold mb-6 text-[#181D24]" style={{ fontFamily: "Rufina" }}>
              We’d love to hear from you
            </h2>

            <form className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                  style={{ fontFamily: "Raleway", fontWeight: 500 }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                  style={{ fontFamily: "Raleway", fontWeight: 500 }}
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                className="placeholder-[#5B656F] w-full border-b border-gray-300 bg-transparent outline-none py-2 resize-none"
                style={{ fontFamily: "Raleway", fontWeight: 500 }}
              />
              <div>
                <label className="text-sm" style={{ fontFamily: "Raleway", fontWeight: 400 }}>
                  <input type="checkbox" className="mr-2" />
                  I accept the Terms and conditions
                </label>
              </div>
              <button
                type="submit"
                className="w-[147px] h-[48px] bg-[#5B656F] text-white px-6 py-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] hover:bg-black transition"
              >
                <span
                  className="text-white text-[16px] leading-[24px] font-semibold uppercase tracking-[0]"
                  style={{ fontFamily: "Raleway", fontWeight: "600" }}
                >
                  SEND
                </span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden relative">
        {/* Background Image */}
        <div
          className="w-full h-[695px] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${LetsConnectVerticalImg})`,
          }}
        />

        <div className="bg-[#DFE3E7] relative h-[640px]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 relative z-20 -top-[218px]">
            {/* Let’s Connect Card */}
            <div className="bg-[#181D24] text-white p-8 rounded-tr-[40px] shadow-lg text-center ">
              <h2
                className="font-bold mb-6 text-[28px]"
                style={{
                  fontFamily: "Rufina",
                  color: "#F5E9D6",
                  lineHeight: "1.2",
                }}
              >
                Reservation’s
              </h2>
              <div className="grid grid-cols-2 gap-y-4 w-full max-w-[336px] text-left text-[13px] mx-auto">
                <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Phone</h4>
                <p style={{ fontFamily: "Raleway" }}>+91 9138295999</p>

                <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Email</h4>
                <p style={{ fontFamily: "Raleway" }}>info@ajpgroup.com</p>

                <h4 className="font-bold" style={{ fontFamily: "Rufina" }}>Address</h4>
                <p className="col-span-1 leading-relaxed" style={{ fontFamily: "Raleway" }}>
                  S No 219/2/1B/1, Burhani Industrial Estate,<br />
                  Kondhwa Budruk, Pune, Maharashtra 411048
                </p>

                <div className="flex gap-4 mt-4 text-lg col-span-2">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-youtube"></i>
                  <i className="fab fa-whatsapp"></i>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-br-[40px] shadow-md">
              <h2 className="text-[24px] text-center font-semibold mb-6 text-[#181D24]" style={{ fontFamily: "Rufina" }}>
                We’d love to hear from you
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                  style={{ fontFamily: "Raleway", fontWeight: 500 }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-b border-gray-300 bg-transparent outline-none py-2 placeholder-[#5B656F]"
                  style={{ fontFamily: "Raleway", fontWeight: 500 }}
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full border-b border-gray-300 bg-transparent outline-none py-2 resize-none placeholder-[#5B656F]"
                  style={{ fontFamily: "Raleway", fontWeight: 500 }}
                />
                <label className="text-sm" style={{ fontFamily: "Raleway", fontWeight: 400 }}>
                  <input type="checkbox" className="mr-2" />
                  I accept the Terms and conditions
                </label>
                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#5B656F] text-white px-6 py-2 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] hover:bg-black transition"
                >
                  <span
                    className="text-white text-[16px] leading-[24px] font-semibold uppercase tracking-[0]"
                    style={{ fontFamily: "Raleway", fontWeight: "600" }}
                  >
                    SEND
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>




      {/* Bottom Footer Section */}
      <div className="bg-[#DFE3E7] pt-[0px] md:pt-[222px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm p-6 px-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src={logo} alt="AJP Logo" className="h-10 w-10 md:h-[30px] md:w-[30px]" />
              <h4
                className="text-[20px] leading-[24px] font-medium tracking-[2px] uppercase text-[#181D24]"
                style={{ fontFamily: 'Raleway' }}
              >
                AJP GROUP
              </h4>
            </div>

            <p className="text-[#5B656F] text-sm leading-relaxed" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
              We are a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6 text-xs text-[#181D24] font-medium text-[14px] mt-8">
              <a href="#" className="hover:underline text-[10px] md:text-[16px]" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                Terms & Conditions
              </a>
              <a href="#" className="hover:underline text-[10px] md:text-[16px]" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                Privacy Notice and Cookies
              </a>
              <a href="#" className="hover:underline text-[10px] md:text-[16px]" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
                Imprint
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-0 md:ml-0 lg:ml-[340px]">
            <h4 className="font-bold text-sm mb-1 text-[#181D24]" style={{ fontFamily: 'Raleway', fontWeight: 700 }}>
              Connect with us
            </h4>
            <p className="text-sm text-[#181D24]" style={{ fontFamily: 'Raleway', fontWeight: 400 }}>
              +91 9138295999
            </p>
            <a
              href="mailto:info@ajpgroup.com"
              className="text-sm text-[#181D24] underline"
              style={{ fontFamily: 'Raleway', fontWeight: 400 }}
            >
              info@ajpgroup.com
            </a>
            <div className="flex gap-4 mt-2 text-lg text-[#181D24]">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-whatsapp"></i>
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
