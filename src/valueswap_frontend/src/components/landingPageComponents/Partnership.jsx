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

                <div className='text-[#FFFFFFBF] text-lg md:leading-6 leading-7   max-w-4xl text-center mt-5'>
                    {LandingPageData.PaternshipPageData.HeadingDescription}
                </div>
            </div>
            <div className='max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 '>
                    {
                        LandingPageData.PaternshipPageData.PartnershipData.map((Company, index) => {

                            const LogoLink = Company.LogoLink
                            const CompanyName = Company.CompanyName
                            const Description = Company.CompanyDesc
                            return (
                                <div className='bg-gradient-to-r from-[#3D3F47] via-[#000211] to-[#373942] flex justify-between   rounded-lg border border-[#3D3F47] p-8 w-60 mx-auto my-6 items-center' key={index}>
                                    <div>
                                        <img src={LogoLink} alt="PartnerShipData" />
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
