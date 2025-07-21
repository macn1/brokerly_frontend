import React from 'react'
import aboutus from '../../assets/about-us1.png'
import blur from '../../assets/blur1.png'

function page() {
  return (
    <>
      <div className="w-full md:h-screen bg-cover bg-center " style={{ backgroundImage: `url(${blur})` }}>
        <div className="flex flex-col md:flex-row  px-24">
          <div className='bg-slate-600 w-full mt-32 '> 
            <div className='text-[#FFFFFF] flex justify-between'>
              <h2 className='text-[52px] font-[Rufina]'>Flat at Lodha</h2>
              <h2  className='text-[52px] font-[Rufina] '>$450  <span className='text-[24px] font-[Rufina]'>/Bills included</span></h2>
            </div>
          </div>
    
        </div>
      </div>
    </>
  )
}

export default page
