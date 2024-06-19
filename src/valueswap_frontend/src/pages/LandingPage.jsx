import React from 'react'
import Hero from '../components/landingPageComponents/Hero'
import About from '../components/landingPageComponents/About'
import Partnership from '../components/landingPageComponents/Partnership'
import Methods from '../components/landingPageComponents/Methods'
import WhitePaper from '../components/landingPageComponents/WhitePaper'
import LiquidityInfo from '../components/landingPageComponents/LiquidityInfo'
import SubscriptionForm from '../components/landingPageComponents/SubscriptionForm'
import Footer from '../components/footer/Footer'
// import DialogBox from '../Modals/Dialouge'
// import Navbar from '../navbar/Navbar'
// import { LandingPageNavbarData } from '../TextData'
// import MobileNavbar from '../navbar/MobileNavbar'
// import { useState } from 'react'
const LandingPage = ({ setClickConnectWallet }) => {


    return (
        <div className=''>

            <div className='md:mx-8 mx-4'>
                <div className=' relative'>
                    <Hero setClickConnectWallet={setClickConnectWallet} />
                </div>

                <About />
                <LiquidityInfo />
                <Partnership />
                <Methods />

                <div className='mt-4'>
                    <WhitePaper />
                </div>

                <SubscriptionForm />
                <Footer/>
            </div>
        </div>
    )
}

export default LandingPage
