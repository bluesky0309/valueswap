import React from 'react'
import GradientSpan from '../../CustomSpan/GradientSpan'
import AboutImageFirst from '../../assets/images/AboutImageFirst.png'
import AboutImageSecond from '../../assets/images/AboutImageSecond.png'
import AboutImageThird from '../../assets/images/AboutImageThird.png'
import { LandingPageData } from '../../TextData'
import {LandingPageNavbarData as NavbarData } from '../../TextData'
const About = () => {
    return (
        <div className='flex justify-between flex-col lg:flex-row md:px-12 lg:px-24 text-3xl md:text-5xl items-center ' id={`${NavbarData.Links[0].LinkId}`}>
            <div className='h-screen flex flex-col justify-evenly   w-full lg:w-1/2'>
                <div>
                    <div className='flex items-center font-fahkwang font-medium gap-2'>
                        <img src={AboutImageFirst} alt="" />
                        <span>{LandingPageData.AboutSectionData.Elementone.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.Elementone.WordTwo}</GradientSpan> <span>{LandingPageData.AboutSectionData.Elementone.WordThree}</span>

                    </div>
                    <p className=' text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2 font-cabin'>
                        {LandingPageData.AboutSectionData.Elementone.Description}
                    </p>
                </div>

                <div>
                    <div className='flex items-center font-fahkwang font-[500] gap-2'>
                        <img src={AboutImageSecond} alt="" />
                        <span>{LandingPageData.AboutSectionData.ElementTwo.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementTwo.WordTwo}</GradientSpan>
                    </div>
                    <p className='text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2 font-cabin'>
                        {LandingPageData.AboutSectionData.ElementTwo.Description}
                    </p>
                </div>

                <div>
                    <div className='flex items-center font-fahkwang font-[500] gap-2'>
                        <img src={AboutImageThird} alt="" />
                        <span>{LandingPageData.AboutSectionData.ElementThree.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementThree.WordTwo}</GradientSpan>
                    </div>
                    <p className='text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2 font-cabin'>
                        {LandingPageData.AboutSectionData.ElementThree.Description}
                    </p>
                </div>


            </div>

            <div className='w-1/2  flex justify-center lg:justify-end  relative'>
                <img src="./image/astro.png" alt="" className='max-h-[500px] z-10' />
                 <img src="./image/largeDot.png" alt=""  className='absolute right-0 top-0 -z-50 hidden lg:inline-block'/>
                 <img src="./image/smallDot.png" alt="" className='absolute top-60 right-60 -z-50 hidden lg:inline-block'/>
            </div>

        </div>
    )
}

export default About
