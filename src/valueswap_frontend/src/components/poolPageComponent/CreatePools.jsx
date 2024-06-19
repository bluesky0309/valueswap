import React, { useState } from 'react'
import GradientButton from '../../buttons/GradientButton'
import { CreatePoolsData } from '../../TextData';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SelectTokensForPools from '../../Modals/poolCreation/SelectTokensForPools';
import InitialLiquidity from '../../Modals/poolCreation/InitialLiquidity';
import SetPoolFees from '../../Modals/poolCreation/SetPoolFees';
const CreatePools = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className='w-11/12 md:w-[60%] lg:w-[47%] mx-auto pb-10'>
        <div className='flex justify-between items-center'>
          <span className='font-cabin font-medium text-2xl leading-7'>{CreatePoolsData.HeadingText}</span>
          <div onClick={() => {
            navigate('/dex-swap/pool/create-pool/steps')
          }}>
            <GradientButton>
              {CreatePoolsData.HeadingButtonText}
            </GradientButton>
          </div>
        </div>

        {
          CreatePoolsData.PersonalPools ? (
            <div >
              {CreatePoolsData.PersonalPools.map((pool, index) => {

                const ImagePool = pool.Images
                const TokenPool = pool.TokenName

                return (
                  <div className='my-6 bg-[#181B21]  rounded-lg mx-auto p-4 font-cabin font-medium text-base leading-5 flex justify-between items-center' key={index}>
                    <div className='flex justify-between items-center gap-4'>
                      <div className='flex gap-2'>
                        {
                          ImagePool.map((image, index) => (
                            <div key={index} className='bg-[#3D3F47] p-1 rounded-lg'><img src={image} alt="" className='h-8 w-8' /></div>
                          ))
                        }
                      </div>

                      <div className='flex text-base'>
                        {
                          TokenPool.map((name, index) => (
                            <div key={index}>
                              {name}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className='mr-2 cursor-pointer'>
                      <ChevronDown />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='my-10 bg-[#303030] rounded-lg mx-auto p-6 text-center font-cabin font-medium text-xl leading-5'>
              You have not created any pool !
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CreatePools
