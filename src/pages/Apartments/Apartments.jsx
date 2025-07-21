import React from 'react'
import aboutus from '../../assets/about-us1.png'
import blur from '../../assets/blur1.png'

function page() {
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



    </>
  )
}

export default page
