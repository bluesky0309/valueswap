import React from 'react'
import { LandingPageData } from '../../TextData'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
import LiquidityPageImageOne from '../../assets/images/LiquidityPageImageOne.png'
import LiquidityPageImageTwo from '../../assets/images/LiquidityPageImageTwo.png'
import LiquidityPageImageThree from '../../assets/images/LiquidityPageImageThree.png'
import LiquidityPageImageFour from '../../assets/images/LiquidityPageImageFour.png'
const LiquidityInfo = () => {
    return (
        <div className='w-full '>
            <div className='flex flex-row flex-wrap md:flex-nowrap justify-center gap-4 md:gap-8 max-w-[1200px] text-center mx-auto items-center mb-8 pb-32 ' id={`${NavbarData.Links[1].LinkId}`}>

                <div className='w-[46%] md:w-4/12 relative'>
                    <div className=" bg-cover bg-center h-36 md:h-80  w-full rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageOne})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70  p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10   flex   text-center md:top-[10%] md:text-start md:justify-start">
                            <div className='flex gap-y-2 md:gap-y-4 flex-col'>
                                <h2 className=" my-auto text-3xl sm:text-5xl  md:text-6xl font-medium m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box1.NumberData}</h2>
                                <p className="my-auto text-sm sm:text-lg md:text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box1.Description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="w-[46%] relative bg-cover bg-center h-36 md:h-36 md:hidden rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageTwo})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10   flex md:justify-start justify-end  text-center md:text-start md:top-0">
                            <div className='flex gap-y-2 flex-col'>
                                <h2 className=" text-3xl sm:text-5xl font-medium  m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.NumberData}</h2>
                                <p className=" text-sm sm:text-lg font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.Description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[46%] relative bg-cover bg-center h-36  md:h-36  md:hidden rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageThree})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10   flex md:justify-end  text-center  md:text-start md:top-0">
                            <div className='flex gap-y-2 flex-col'>
                                <h2 className=" text-3xl sm:text-5xl  font-medium m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox2.NumberData}</h2>
                                <p className=" text-sm sm:text-lg font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox2.Description}</p>
                            </div>
                        </div>
                    </div>
                {/*  */}
                <div className='hidden md:flex flex-col justify-evenly gap-8 lg:w-4/12 xl:w-6/12'>
                    <div className="relative bg-cover bg-center h-80 md:h-36 w-full rounded-lg border-2  border-white border-opacity-60 p-2" style={{ backgroundImage: `url(${LiquidityPageImageTwo})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10   flex md:justify-start justify-center top-1/3 text-center md:text-start md:top-0">
                            <div className='flex gap-y-4 flex-col'>
                                <h2 className="  text-xl md:text-6xl font-normal m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.NumberData}</h2>
                                <p className=" mx-1 text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.Description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-cover bg-center h-80  md:h-36  w-full rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageThree})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10   flex md:justify-end justify-center top-1/3 text-center  md:text-start md:top-0">
                            <div className='flex gap-y-4 flex-col'>
                                <h2 className="  text-xl md:text-6xl font-normal m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox2.NumberData}</h2>
                                <p className="  text-xl font-cabin mx-1">{LandingPageData.LiquiditySectionData.Box2.SubBox2.Description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[46%] md:w-4/12 relative'>
                    <div className=" bg-cover bg-center h-36 md:h-80 w-full  rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageFour})` }} >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                        <div className="relative z-10  flex md:flex-col  md:h-full   text-center justify-end  md:text-start md:bottom-10">
                            <div className='flex gap-y-2 md:gap-y-4 flex-col'>
                                <h2 className="text-3xl sm:text-5xl  md:text-6xl font-medium m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box3.NumberData}</h2>
                                <p className="text-sm sm:text-lg md:text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box3.Description}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default LiquidityInfo
