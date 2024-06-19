import React from 'react'

const SubscriptionForm = () => {
  return (
    <div className="flex justify-center items-center  pb-56  ">
      <div className="text-center ">
        <h2 className="text-white text-3xl md:text-5xl font-semibold pb-20">Sign up for ICPSwap updates</h2>
        <form className="flex flex-col gap-y-2 md:flex-row justify-center">
          <input 
            type="email" 
            placeholder="Enter email here" 
            className="px-6 py-2 md:py-4  w-full md:w-[40vw] text-2xl md:rounded-s-2xl bg-[#292c2f] text-white border border-gray-700 focus:outline-none focus:border-gray-500"
          />
          <button className="px-10 py-2 sm:py-0   md:rounded-e-2xl bg-[#ff4500] text-white  text-xl font-semibold">Subscribe</button>
        </form>
      </div>
    </div>
  );
}


export default SubscriptionForm