import React from 'react'
import { LandingPageData } from '../../TextData'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
import LiquidityPageImageOne from '../../assets/images/LiquidityPageImageOne.png'
import LiquidityPageImageTwo from '../../assets/images/LiquidityPageImageTwo.png'
import LiquidityPageImageThree from '../../assets/images/LiquidityPageImageThree.png'
import LiquidityPageImageFour from '../../assets/images/LiquidityPageImageFour.png'
const LiquidityInfo = () => {
    return (
        <div className='flex md:flex-row flex-col justify-center gap-8  items-center mb-8 py-32' id={`${NavbarData.Links[1].LinkId}`}>

            <div className="relative bg-cover bg-center h-80 w-80 rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageOne})` }} >
                <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70  p-4 h-full flex flex-col justify-end rounded-lg"></div>
                <div className="relative z-10   flex justify-center top-1/3 text-center md:top-0 md:text-start md:justify-start">
                    <div>
                        <h2 className="  text-6xl font-bold m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box1.NumberData}</h2>
                        <p className="  text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box1.Description}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-evenly gap-8 lg:w-4/12 xl:w-6/12'>
                <div className="relative bg-cover bg-center h-80 w-80 md:h-36 lg:w-full rounded-lg border-2  border-white border-opacity-60 p-2" style={{ backgroundImage: `url(${LiquidityPageImageTwo})` }} >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                    <div className="relative z-10   flex md:justify-start justify-center top-1/3 text-center md:text-start md:top-0">
                        <div>
                            <h2 className="  text-6xl font-bold m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.NumberData}</h2>
                            <p className="  text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox1.Description}</p>
                        </div>
                    </div>
                </div>
                <div className="relative bg-cover bg-center h-80 w-80 md:h-36  lg:w-full rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageThree})` }} >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                    <div className="relative z-10   flex md:justify-end justify-center top-1/3 text-center  md:text-start md:top-0">
                        <div>
                            <h2 className="  text-6xl font-bold m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox2.NumberData}</h2>
                            <p className="  text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box2.SubBox2.Description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative bg-cover bg-center h-80 w-80 rounded-lg border-2  border-white border-opacity-60 p-4" style={{ backgroundImage: `url(${LiquidityPageImageFour})` }} >
                <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#00308E] opacity-70 p-4 h-full flex flex-col justify-end rounded-lg"></div>
                <div className="relative z-10   flex md:flex-col md:justify-end md:h-full justify-center top-1/3 text-center md:text-start md:top-0">
                    <div >
                        <h2 className="  text-6xl font-bold m-1 font-cabin">{LandingPageData.LiquiditySectionData.Box3.NumberData}</h2>
                        <p className="  text-xl font-cabin">{LandingPageData.LiquiditySectionData.Box3.Description}</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default LiquidityInfo
