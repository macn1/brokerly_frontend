import React from 'react'
import blur from '../../assets/blur1.png'
import aboutus from '../../assets/couple.png'
import faacebbok from '../../assets/icons/facebook.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import ytb from '../../assets/icons/ytb.png'
import figma from '../../assets/icons/figma.png'
import net from '../../assets/icons/net.png'
function Contact() {

  const faqs = [
    "Where can I find the offer of villa and service prices?",
    "What is included in the price of Accommodation?",
    "What is the procedure for arranging and booking Accommodation?",
    "How do I pay the rest of the Accommodation price, at once or in several installments?",
    "What if I am late with paying the advance payment or the remaining amount?",
    "How can I cancel the Accommodation after having paid the advance payment or the remaining amount?",
    "Will I receive a refund of the advance payment or the remaining amount for the Accommodation in case of cancellation?",
    "What are the terms of payment by bank transfer and can I pay by credit card?",
    "Is it possible to rent the villa outside the Saturday to Saturday period?",
    "Is a deposit required?",
    "Is it possible to check in before the time period?",
    "Is it cheaper if I book directly through the owner?",
  ];

  const midIndex = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midIndex);
  const rightColumn = faqs.slice(midIndex);
  return (
    <>
      <div className="w-full md:h-full h-screen bg-cover bg-center " style={{ backgroundImage: `url(${blur})` }}>
        <div className=' md:h-64  h-44 flex justify-center items-end  '>
          <div className='text-center w-[100%]  '>
            <h1 className='text-3xl w-full  md:text-5xl  font-[Rufina] font-[700] text-[#181D24] '>
              Contact Us
            </h1>
            <p className='md:mt-5 mt-1  text-[13px] md:text-[16px] font-[Raleway] text-[#181D24] max-w-[510px] md:max-w-full '>
              We're always here to answer your questions. <br />
              Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <div className='  w-full md:flex justify-center md:px-44 px-5 mt-5 mb-10 md:py-10 py-5'>
          <div className='bg-[]  h-[40%] md:h-[340px] md:w-[55%] w-full rounded-tl-[60px] '>
            <img
              src={aboutus}
              alt="Scenic View"
              className="w-[550px] h-[280px] md:h-full rounded-tl-[60px]  md:rounded-bl-[60px] md:rounded-tl-none "
            />
          </div>
          <div className='bg-white shadow-2xl  md:h-[340px] w-full md:w-[65%] flex flex-col md:rounded-tr-[60px] rounded-br-[60px] md:rounded-br-none '>
            <div className='md:px-16 md:py-20 py-9 text-center '>
              <div className=''>
                <h2 className='text-4xl font-[Rufina] font-[700] text-[#181D24] '>Connect with us</h2>
                <div className='md:px-2 px-16'>
                  <div className=' flex justify-between '>
                    <div className="  w-[30%] flex font-[Rufina] font-semibold mt-2">Phone</div>
                    <div className="  flex justify-start items-start w-[70%] font-[Rufina] mt-2"><span className='text-sm'> +91 9112195999</span></div>
                  </div>
                  <div className=' flex justify-between'>
                    <div className=" w-[30%] flex font-[Rufina] font-semibold mt-2">Email</div>
                    <div className=" flex justify-start items-start w-[70%] font-[Rufina] mt-2"><span className='text-sm'>info@ajpgroup.com</span></div>
                  </div>
                  <div className='  flex justify-between'>
                    <div className=" w-[30%] flex font-[Rufina] font-semibold mt-2">Address</div>
                    <div className="flex flex-col justify-start items-start w-[70%] font-[Rufina mt-2  ">
                      <p className='text-sm'>Sr. No. 27/9/1B/2, Burhani</p>
                      <p className='text-sm'>Industrial Estate, Kondhwa </p>
                      <p className='text-sm'>Pune, Maharashtra 411048</p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 md:px-3 px-16 py-3 mt-3 md:mt-10 mb-3 '>
                  <img src={faacebbok} alt="fb" className='w-5 h-5' />
                  <img src={whatsapp} alt="fb" className='w-5 h-5' />
                  <img src={ytb} alt="fb" className='w-5 h-5' />
                  <img src={figma} alt="fb" className='w-5 h-5' />
                  <img src={net} alt="fb" className='w-5 h-5' />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='h-full w-full bg-[#FFFFFF00] md:px-24 py-10 md:py-0'>
        <div className='text-center md:mt-32 mt-5 font-[Rufina] font-[700] '>
          <h2 className='text-3xl w-full  md:text-5xl  font-[Rufina] font-[700] text-[#181D24] px-4'>Frequently asked questions</h2>
          <p className='mt-8 md:font-[Raleway] md:px-0 px-6'>Everything you need to know about the product and billing.</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-x-10 border-t border-gray-300 ">
            {faqs.map((question, index) => (
              <div
                key={index}
                className={`py-4 cursor-pointer hover:text-[#616161] ${index !== 0 ? "border-t border-gray-300" : ""
                  }`}
              >
                <div className="flex items-start gap-2 text-base font-medium text-gray-800">
                  <span className="text-sm font-bold text-[#616161]">+</span>
                  <p className='text-sm font-[Raleway] text-[#181D24'>{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default Contact
