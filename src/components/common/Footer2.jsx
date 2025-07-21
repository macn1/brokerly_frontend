import LetsConnectLandscapeImg from "../../assets/lets_connect_landscape.png";
import LetsConnectVerticalImg from "../../assets/lets_connect_vertical.png";
import faacebbok from '../../assets/icons/facebook.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import ytb from '../../assets/icons/ytb.png'
import figma from '../../assets/icons/figma.png'
import net from '../../assets/icons/net.png'
import logo from "../../assets/logo.png";
const Footer = () => {
    return (
        <footer className="h-screen flex flex-col">
            {/* Top 50% with custom background color */}
            <div className="h-[800px] bg-[] flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full md:px-[55px] ">
                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-br-[40px] shadow-md mb-10 ">
                        <h2
                            className="text-[24px] text-center font-semibold mb-6 text-[#181D24]"
                            style={{ fontFamily: "Rufina" }}
                        >
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
                            <div className="flex flex-col">
                                <label
                                    className="text-sm"
                                    style={{ fontFamily: "Raleway", fontWeight: 400 }}
                                >
                                    <input type="checkbox" className="mr-2" />
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
                </div>
            </div>

            {/* Bottom 50% with white background */}
            <div className="h-1/2 bg-[#DFE3E7]">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <img src={logo} alt="AJP Logo" className="h-10 w-10" />
                            <h4
                                className="text-[20px] leading-[24px] font-medium tracking-[2px] uppercase text-[#181D24]"
                                style={{ fontFamily: "Raleway" }}
                            >
                                AJP GROUP
                            </h4>
                        </div>
                        <p
                            className="text-[#5B656F] text-sm leading-relaxed mt-5"
                            style={{ fontFamily: "Raleway", fontWeight: 400 }}
                        >
                            We are a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-[#181D24] font-medium text-[14px] mt-8">
                            <a
                                href="#"
                                className="hover:underline text-[12px]"
                                style={{ fontFamily: "Raleway", fontWeight: 400 }}
                            >
                                Terms & Conditions
                            </a>
                            <a
                                href="#"
                                className="hover:underline text-[12px]"
                                style={{ fontFamily: "Raleway", fontWeight: 400 }}
                            >
                                Privacy Notice and Cookies
                            </a>
                            <a
                                href="#"
                                className="hover:underline text-[12px]"
                                style={{ fontFamily: "Raleway", fontWeight: 400 }}
                            >
                                Imprint
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4
                            className="font-bold text-base mb-1 text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: 700 }}
                        >
                            Connect with us
                        </h4>
                        <p
                            className="text-sm text-[#181D24]"
                            style={{ fontFamily: "Raleway", fontWeight: 400 }}
                        >
                            +91 9138295999
                        </p>
                        <a
                            href="mailto:info@ajpgroup.com"
                            className="text-sm text-[#181D24] underline"
                            style={{ fontFamily: "Raleway", fontWeight: 400 }}
                        >
                            info@ajpgroup.com
                        </a>
                        <div className="flex gap-4 mt-3 mb-3">
                            <img src={faacebbok} alt="fb" className="w-5 h-5" />
                            <img src={whatsapp} alt="whatsapp" className="w-5 h-5" />
                            <img src={ytb} alt="ytb" className="w-5 h-5" />
                            <img src={figma} alt="figma" className="w-5 h-5" />
                            <img src={net} alt="net" className="w-5 h-5" />
                        </div>
                        <p
                            className="text-[12px] text-[#5B656F]"
                            style={{ fontFamily: "Raleway", fontWeight: 400 }}
                        >
                            AJP GROUPS | © All rights reserved 2022–2023
                        </p>
                    </div>
                </div>
            </div>
        </footer>



    );
};

export default Footer;
