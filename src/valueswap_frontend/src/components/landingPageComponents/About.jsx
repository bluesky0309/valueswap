import React from 'react'
import GradientSpan from '../../CustomSpan/GradientSpan'
import AboutImageFirst from '../../assets/images/AboutImageFirst.png'
import AboutImageSecond from '../../assets/images/AboutImageSecond.png'
import AboutImageThird from '../../assets/images/AboutImageThird.png'
import { LandingPageData } from '../../TextData'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
const About = () => {
    return (
        <div className='flex justify-center py-32  ' >
            <div className='flex max-w-[1200px]  flex-col lg:flex-row md:px-12 justify-evenly  text-2xl md:text-4xl items-center ' id={`${NavbarData.Links[0].LinkId}`}>
                <div className='max-h-[800px] flex flex-col gap-y-8  w-full lg:w-1/2'>
                    <div>
                        <div className='flex items-center font-fahkwang font-medium gap-2'>
                            <img src={AboutImageFirst} alt="" />
                            <span>{LandingPageData.AboutSectionData.Elementone.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.Elementone.WordTwo}</GradientSpan> <span>{LandingPageData.AboutSectionData.Elementone.WordThree}</span>

                        </div>
                        <p className=' text-[#FFFFFFBF] text-base md:text-lg md:leading-7 leading-6 m-2 font-cabin'>
                            {LandingPageData.AboutSectionData.Elementone.Description}
                        </p>
                    </div>

                    <div>
                        <div className='flex items-center font-fahkwang font-[500] gap-2'>
                            <img src={AboutImageSecond} alt="" />
                            <span>{LandingPageData.AboutSectionData.ElementTwo.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementTwo.WordTwo}</GradientSpan>
                        </div>
                        <p className='text-[#FFFFFFBF] text-base md:text-lg md:leading-7 leading-6 m-2 font-cabin'>
                            {LandingPageData.AboutSectionData.ElementTwo.Description}
                        </p>
                    </div>

                    <div>
                        <div className='flex items-center font-fahkwang font-[500] gap-2'>
                            <img src={AboutImageThird} alt="" />
                            <span>{LandingPageData.AboutSectionData.ElementThree.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementThree.WordTwo}</GradientSpan>
                        </div>
                        <p className='text-[#FFFFFFBF] text-base md:text-lg md:leading-7 leading-6 m-2 font-cabin'>
                            {LandingPageData.AboutSectionData.ElementThree.Description}
                        </p>
                    </div>


                </div>

                <div className='md:w-1/2  flex align-middle items-center justify-center lg:justify-end relative'>
                    <img src="./image/astro.png" alt="" className='h-3/5 lg:max-h-[500px] lg:pr-32 z-10' />
                    <img src="./image/largeDot.png" alt="" className='absolute right-[140px] top-0 -z-50 hidden max-h-20 lg:inline-block' />
                    <img src="./image/smallDot.png" alt="" className='absolute top-[17rem] md:top-[16rem] lg:top-60 right-[164px] md:right-[216px] lg:right-[376px] -z-50  lg:inline-block' />
                </div>
            </div>

        </div>
    )
}

export default About
