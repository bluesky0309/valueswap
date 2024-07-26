import React from 'react'
import MethodsImageOne from '../../assets/images/MethodsImageOne.png'
import MethodsImageTwo from '../../assets/images/MethodsImageTwo.png'
import { LandingPageData } from '../../TextData'
import { LandingPageNavbarData as NavbarData } from '../../TextData'
import GradientSpan from '../../CustomSpan/GradientSpan'
import GradientButton from '../../buttons/GradientButton'
const Methods = () => {
    return (
        <div className='mt-16 h-full text-center mx-auto  mb-16' id={`${NavbarData.Links[2].LinkId}`}>

            <div className='hidden max-w-[1200px] mx-auto lg:flex  flex-row justify-between items-center space-y-0 mb-32'>

                <div className=' w-1/2'>
                    <img src={MethodsImageOne} alt="MethodImageOne" className='h-11/12  w-full mx-auto' />
                </div>

                <div className='w-1/2  py-[4.5rem] pl-20 flex flex-col rounded-r-lg items-start font-fahkwang text-4xl h-max bg-[#000211]'>
                    <div className='mb-0 w-full '>
                        <div className='flex gap-2 '>
                            <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.UpperSection.HeadingWordTwo}</GradientSpan>
                        </div>
                        <span className='flex  justify-start'>{LandingPageData.MethodsText.UpperSection.HeadingWordThree}</span>
                    </div>

                    <div className='font-cabin text-[#FFFFFFBF] text-lg py-4 leading-6 w-10/12 text-start'>
                        {LandingPageData.MethodsText.UpperSection.Description}
                    </div>
                    <div className='m-4 md:m-0'>
                        <GradientButton>{LandingPageData.MethodsText.UpperSection.ButtonText}</GradientButton>
                    </div>
                </div>

            </div>


            <div className='lg:flex justify-between  max-w-[1200px] mx-auto  items-center hidden '>

                <div className='w-1/2 h-10/12 bg-[#000211] py-[6.3rem] flex flex-col items-start rounded-l-lg  justify-between pl-12 font-fahkwang text-4xl'>
                    <div>
                        <div className='flex gap-2'>
                            <GradientSpan >{LandingPageData.MethodsText.LowerSection.HeadingWordOne}</GradientSpan>
                            <span className=' '>{LandingPageData.MethodsText.LowerSection.HeadingWordTwo}</span>
                        </div>
                    </div>

                    <div className='font-cabin text-[#FFFFFFBF] text-lg py-4 text-start leading-6 w-10/12   '>
                        {LandingPageData.MethodsText.LowerSection.Description}
                    </div>
                    <div>
                        <GradientButton>{LandingPageData.MethodsText.LowerSection.ButtonText}</GradientButton>
                    </div>
                </div>

                <div className='w-1/2  '>
                    <img src={MethodsImageTwo} alt="MethodImageTwo" className=' h-10/12   mx-auto w-full' />
                </div>
            </div>

            {/*  */}
            <div className='flex flex-col justify-center text-center items-center lg:hidden mb-40'>

                <div className='w-full items-center'>
                    <img className="w-full" src={MethodsImageOne} alt=""  />
                </div>

                <div className=' rounded-b-xl bg-[#000211] flex flex-col justify-evenly font-fahkwang text-4xl p-4 gap-y-6 pt-8'>
                    <div className='mb-4 md:mb-0'>
                        <div className='flex gap-2 flex-wrap '>
                            <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.UpperSection.HeadingWordTwo}</GradientSpan>
                            <span className=' '>{LandingPageData.MethodsText.UpperSection.HeadingWordThree}</span>
                        </div>
                    </div>

                    <div className='font-cabin font-[400] text-base md:text-xl leading-7   text-start '>
                        {LandingPageData.MethodsText.UpperSection.Description}
                    </div>
                    <div className='m-4 '>
                        <GradientButton CustomCss={`max-w-[6rem]`}>{LandingPageData.MethodsText.UpperSection.ButtonText}</GradientButton>
                    </div>
                </div>

            </div>

            <div className='flex flex-col justify-center items-center lg:hidden  md:space-y-0'>
                <div className='w-full  items-center'>
                    <img className="w-full" src={MethodsImageTwo} alt="" />
                </div>

                <div className=' rounded-b-xl bg-[#000211] flex flex-col justify-evenly font-fahkwang text-4xl gap-y-6 pt-8'>
                    <div>
                        <div className='flex gap-2 m-2 text-center'>
                            <span className=' '>{LandingPageData.MethodsText.LowerSection.HeadingWordOne}</span>
                            <GradientSpan>{LandingPageData.MethodsText.LowerSection.HeadingWordTwo}</GradientSpan>
                        </div>
                    </div>

                    <div className='font-cabin font-[400] text-base md:text-xl leading-7  text-start '>
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
