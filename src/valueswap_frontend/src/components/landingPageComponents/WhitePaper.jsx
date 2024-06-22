import React from 'react'
import GradientButton from '../../buttons/GradientButton'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
import { LandingPageData } from '../../TextData'
const whitePaper = () => {
    return (
        <div className='md:mx-20 mt-32 h-full min-h-80 w-[88%] mx-auto' id={`${NavbarData.Links[3].LinkId}`}>

            <div className='w-full flex flex-col gap-8 md:gap-y-12 py-12 md:py-20 bg-gradient-to-r from-[#05071D] via-[#546093] to-[#05071D] border border-1 rounded-lg h-4/6  text-center   '>



                <div className='font-fahkwang font-bold md:font-medium md:text-6xl text-2xl'>
                    {LandingPageData.WhitePaperText.Heading}
                </div>

                <div className='md:text-xl font-normal font-cabin leading-6 max-w-7xl mx-auto px-1 md:px-24'>
                    {LandingPageData.WhitePaperText.Description}
                </div>

                <div>
                    <GradientButton>{LandingPageData.WhitePaperText.ButtonText}</GradientButton>
                </div>

            </div>
        </div>
    )
}

export default whitePaper
