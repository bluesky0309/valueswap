import React from 'react'
import GradientSpan from '../../CustomSpan/GradientSpan'
import AboutImageFirst from '../../assets/images/AboutImageFirst.png'
import AboutImageSecond from '../../assets/images/AboutImageSecond.png'
import AboutImageThird from '../../assets/images/AboutImageThird.png'
import AboutGifFirst from '../../assets/images/AboutGifFirst.gif'
import { LandingPageData } from '../../TextData'
import {LandingPageNavbarData as NavbarData } from '../../TextData'
const About = () => {
    return (
        <div className='flex justify-between md:px-24 text-3xl md:text-5xl items-center ' id={`${NavbarData.Links[0].LinkId}`}>
            <div className='h-screen flex flex-col justify-evenly   w-full lg:w-1/2'>
                <div>
                    <div className='flex items-center font-fahkwang font-medium gap-2'>
                        <img src={AboutImageFirst} alt="" />
                        <span>{LandingPageData.AboutSectionData.Elementone.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.Elementone.WordTwo}</GradientSpan> <span>{LandingPageData.AboutSectionData.Elementone.WordThree}</span>

                    </div>
                    <p className=' text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2'>
                        {LandingPageData.AboutSectionData.Elementone.Description}
                    </p>
                </div>

                <div>
                    <div className='flex items-center font-fahkwang font-[500] gap-2'>
                        <img src={AboutImageSecond} alt="" />
                        <span>{LandingPageData.AboutSectionData.ElementTwo.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementTwo.WordTwo}</GradientSpan>
                    </div>
                    <p className='text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2'>
                        {LandingPageData.AboutSectionData.ElementTwo.Description}
                    </p>
                </div>

                <div>
                    <div className='flex items-center font-fahkwang font-[500] gap-2'>
                        <img src={AboutImageThird} alt="" />
                        <span>{LandingPageData.AboutSectionData.ElementThree.WordOne}</span> <GradientSpan>{LandingPageData.AboutSectionData.ElementThree.WordTwo}</GradientSpan>
                    </div>
                    <p className='text-[#FFFFFFBF] text-lg md:leading-7 leading-6 m-2'>
                        {LandingPageData.AboutSectionData.ElementThree.Description}
                    </p>
                </div>


            </div>

            <div className='w-1/2 hidden lg:block'>
                <img src={AboutGifFirst} alt="" className='bg-[#000711] rotate-11-7' />
            </div>

        </div>
    )
}

export default About
