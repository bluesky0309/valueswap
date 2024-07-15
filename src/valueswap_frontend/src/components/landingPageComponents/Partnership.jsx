import React from 'react'
import { LandingPageData } from '../../TextData'
import GradientSpan from '../../CustomSpan/GradientSpan'
const Partnership = () => {
    return (
        <div>
            <div className='flex flex-col items-center font-fahkwang '>
                <div className='md:text-5xl text-3xl flex'>
                    <span className='  mr-2'>{LandingPageData.PaternshipPageData.HeadingWordOne}</span> <GradientSpan>{LandingPageData.PaternshipPageData.HeadingWordTwo}</GradientSpan>
                </div>

                <div className='text-[#FFFFFFBF] text-lg md:leading-6 leading-7 max-w-2xl text-center mt-5'>
                    {LandingPageData.PaternshipPageData.HeadingDescription}
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 '>
                    {
                        LandingPageData.PaternshipPageData.PartnershipData.map((Company, index) => {

                            const LogoLink = Company.LogoLink
                            const CompanyName = Company.CompanyName
                            const Description = Company.CompanyDesc
                            return (
                                <div className='bg-gradient-to-r from-[#000211] to-[#091031] flex justify-around cursor-pointer rounded-lg border border-[#3D3F47] py-8 w-[44vw] md:w-60 mx-auto my-6 items-center group' key={index}>
                                    <div  className='transition-all duration-700 group-hover:scale-110 sm:group-hover:scale-150'>
                                        <img src={LogoLink} alt="PartnerShipData"/>
                                    </div>

                                    <div className='flex flex-col font-cabin'>
                                        <span>
                                            {CompanyName}
                                        </span>
                                        <span>
                                            {Description}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Partnership
