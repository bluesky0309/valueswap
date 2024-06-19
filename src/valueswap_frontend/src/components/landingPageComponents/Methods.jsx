import React from 'react'
import MethodsImageOne from '../../assets/images/MethodsImageOne.png'
import MethodsImageTwo from '../../assets/images/MethodsImageTwo.png'
import { LandingPageData } from '../../TextData'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
import GradientSpan from '../../CustomSpan/GradientSpan'
import GradientButton from '../../buttons/GradientButton'
const Methods = () => {
    return (
        <div className='mt-16 h-full md:mx-20
        
        
        mb-16' id={`${NavbarData.Links[2].LinkId}`}>

            <div className='hidden lg:flex  flex-row justify-between space-y-0 m-16'>

                <div className='w-1/2 ml-16 items-end'>
                    <img src={MethodsImageOne} alt="MethodImageOne" className='h-10/12 w-10/12 ' />
                </div>

                <div className='w-1/2 flex flex-col justify-between font-fahkwang text-4xl  items-start'>
                    <div className='mb-0'>
                        <div className='flex gap-2 '>
                            <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.UpperSection.HeadingWordTwo}</GradientSpan>
                        </div>
                        <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordThree}</span>
                    </div>

                    <div className='font-cabin text-[#FFFFFFBF] text-lg py-4 leading-6 w-10/12 text-start'>
                        {LandingPageData.MethodsText.UpperSection.Description}
                    </div>
                    <div className='m-4 md:m-0'>
                        <GradientButton>{LandingPageData.MethodsText.UpperSection.ButtonText}</GradientButton>
                    </div>
                </div>

            </div>


            <div className='lg:flex justify-between hidden m-16'>

                <div className='w-1/2 ml-16 flex flex-col justify-between font-fahkwang text-4xl  '>
                    <div>
                        <div className='flex gap-2'>
                            <GradientSpan >{LandingPageData.MethodsText.LowerSection.HeadingWordOne}</GradientSpan>
                            <span className=' '>{LandingPageData.MethodsText.LowerSection.HeadingWordTwo}</span>
                        </div>
                    </div>

                    <div className='font-cabin text-[#FFFFFFBF] text-lg py-4 leading-6 w-10/12   '>
                        {LandingPageData.MethodsText.LowerSection.Description}
                    </div>
                    <div>
                        <GradientButton>{LandingPageData.MethodsText.LowerSection.ButtonText}</GradientButton>
                    </div>
                </div>

                <div className='w-1/2  ml-16 items-end'>
                    <img src={MethodsImageTwo} alt="MethodImageTwo" className=' h-10/12 w-10/12 ' />
                </div>
            </div>

            <div className='flex flex-col justify-center text-center items-center space-y-8 lg:hidden'>

                <div className='md:w-1/2 lg:ml-16 items-end'>
                    <img src={MethodsImageOne} alt="" className='' />
                </div>

                <div className='md:w-1/2 flex flex-col justify-evenly font-fahkwang text-4xl p-4 items-center text-center'>
                    <div className='mb-4 md:mb-0'>
                        <div className='flex gap-2 text-center'>
                            <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.UpperSection.HeadingWordTwo}</GradientSpan>
                        </div>
                        <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordThree}</span>
                    </div>

                    <div className='font-cabin font-[400] text-base md:text-xl leading-7   text-center '>
                        {LandingPageData.MethodsText.UpperSection.Description}
                    </div>
                    <div className='m-4 '>
                        <GradientButton>{LandingPageData.MethodsText.UpperSection.ButtonText}</GradientButton>
                    </div>
                </div>

            </div>

            <div className='flex flex-col justify-center items-center lg:hidden space-y-8 md:space-y-0'>
                <div className='md:w-1/2 lg:ml-16'>
                    <img src={MethodsImageTwo} alt="" />
                </div>

                <div className='md:w-1/2  flex flex-col justify-evenly font-fahkwang text-4xl p-4 items-center text-center'>
                    <div>
                        <div className='flex gap-2 m-2 text-center'>
                            <span className=' '>{LandingPageData.MethodsText.LowerSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.LowerSection.HeadingWordTwo}</GradientSpan>
                        </div>
                    </div>

                    <div className='font-cabin font-[400] text-base md:text-xl leading-7   '>
                        {LandingPageData.MethodsText.LowerSection.Description}
                    </div>
                    <div className='m-4'>
                        <GradientButton>{LandingPageData.MethodsText.LowerSection.ButtonText}</GradientButton>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Methods
