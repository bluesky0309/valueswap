import React from 'react'
import { LandingPageData } from '../../TextData'
import GradientButton from '../../buttons/GradientButton'
import BorderGradientButton from '../../buttons/BorderGradientButton'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuthClient'
import ParticlesBackground from '../particles/Particles'
const Hero = ({ setClickConnectWallet }) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    return (

        <div id='beng' className=' flex flex-col justify-evenly relative pt-8'>
            {/* <ParticlesBackground /> */}
            <div className=' items-center  text-center'>
                <div className='font-fahkwang font-light md:text-6xl text-4xl pb-5 m-2 md:m-0'>
                    <span>
                        {LandingPageData.HeroSection.HeadLineWordOne}
                    </span>
                    <div>
                        <span className='bg-gradient-to-r from-[#F2A851] via-[#8F7CFF] to-[#003EC6] text-transparent bg-clip-text'>{LandingPageData.HeroSection.HeadLineWordTwo}</span>
                        <span > {LandingPageData.HeroSection.HeadLineWordThree}</span>
                    </div>
                </div>
                <span className='font-cabin text-lg '>
                    {LandingPageData.HeroSection.Tagline}
                </span>

                <div className='flex mt-5 gap-4 justify-center'>
                    <div onClick={() => {
                        navigate('/dex-swap/pool')
                    }}>
                        <GradientButton CustomCss={`w-[120px]`}>
                            {LandingPageData.HeroSection.ExploreButton}
                        </GradientButton>
                    </div>
                    <div onClick={() => {
                        setClickConnectWallet(true)
                    }}>
                        <BorderGradientButton customCss={`bg-[#000711]`}>
                            {isAuthenticated ? (
                                <div>
                                    {LandingPageData.HeroSection.DisconnectButton}
                                </div>
                            ) : (
                                <div>
                                    {LandingPageData.HeroSection.ConnectButton}
                                </div>
                            )}

                        </BorderGradientButton>
                    </div>
                </div>
            </div>
            {/*  */}

            <div className='relative py-8'>
                <img src="/image/rectangle.png" alt="Main" className=' scale-[1.1] w-[91vw] bg-cover backgroundHero' />
                <div className='bg-gradient-radial from-[#C8C008] to-transparent w-[20%] h-[20vw] opacity-[1] absolute right-[78%] blur-[165px] top-[25%] rounded-2xl'></div>
                <div className='bg-gradient-radial from-[#00308E] to-transparent w-[20%] h-[20vw] opacity-[1] absolute left-[78%] blur-[165px] top-[25%] rounded-2xl'></div>
                <div class="absolute md:flex justify-between left-[9%] w-[81%] lg:w-[79%] top-[37%] hidden   overflow-hidden">
                    <div id="c1" className="h-28 w-28 flex  flex-col gap-y-2  z-10 relative">
                        <img className="h-8 w-8 lg:h-12 lg:w-12" src="/image/ckBTC.svg" alt="ICP Icon" />
                        <img className="h-8 w-8 lg:h-12 lg:w-12  absolute top-10 right-24 lg:top-14 lg:right-20" src="/image/ckETH.svg" alt="Dragginz Icon" />
                    </div>
                    <div id="c2" className="flex h-28 w-20 flex-col gap-y-2  z-10">
                        <img className="h-8 w-8 lg:h-12 lg:w-12" src="/image/icp.svg" alt="ICP Icon" />
                        <img className="h-8 w-8 lg:h-12 lg:w-12  absolute top-10 lg:top-14 left-5" src="/image/Dragginz.png" alt="Dragginz Icon" />
                    </div>
                </div>
            </div>


            <div className='text-center mt-4'>
                <div className='font-cabin font-normal leading-5 text-xl '>
                    {LandingPageData.HeroSection.BottomLine}
                </div>
            </div>
        </div>

    )
}

export default Hero
