

import React, { useState, useEffect } from 'react'
import { SwappingTableData, SwappingTextData } from '../TextData';
import { MoveRight } from 'lucide-react';
import WalletID from '../assets/images/WalletID.png'

const Swapping = ({ id }) => {
  const SwappingData = SwappingTableData[id].Enteries
  const [displayCount, setDisplayCount] = useState(Math.min(5, SwappingData.length));
  const [buttonVisible, setButtonVisibility] = useState(true);
  useEffect(() => {
    if (SwappingData.length < 6) {
      setButtonVisibility(false)
    }
  }, [SwappingData])

  useEffect(() => {
    console.log("Swappppp DSatatatatatat", SwappingData)
    console.log("DisplayCount length", displayCount)
    console.log("array length", SwappingData.length)
  }, [displayCount])


  return (
    <>
      <div className='mt-10  flex flex-col font-cabin'>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 '>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 border border-white bg-[#05071D]  border-opacity-65 rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300 '>
                <thead className='  '>
                  <tr className='bg-[#010427]'>
                    {SwappingTextData.Headings.map((heading, index) => (
                      <th
                        key={index}
                        scope='col'
                        className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white'
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className=' bg-[#05071D] '>
                  {SwappingData.slice(0, displayCount).map((swap, index) => (
                    <tr key={index}>

                      <td className='min-w-72 mx-auto whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-3 justify-center'>
                        <span className='bg-[#3D3F47] p-1 rounded-lg flex justify-between gap-1  items-center'>
                          <img src={swap.FromToken.ImagePath} alt="" className='w-6 h-6 transform scale-125' />
                          <span>{swap.FromToken.Value}</span>
                        </span>
                        <span><MoveRight /></span>
                        <span className='bg-[#3D3F47] p-1 rounded-lg flex justify-between gap-1  items-center'>
                          <img src={swap.ToTokenn.ImagePath} alt="" className='w-6 h-6 transform scale-125' />
                          <span>{swap.ToTokenn.Value}</span>
                        </span>
                      </td>

                      <td className='min-w-32 whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        $ {swap.Value.toLocaleString('en-US')}
                      </td>
                      <td className='min-w-80 flex items-center justify-center gap-3 whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        <span>
                          <img src={WalletID} alt="" className='w-4 h-4 rounded-full' />
                        </span>
                        <span>
                          {swap.WalletId}
                        </span>
                      </td>
                      <td className=' min-w-32 whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                        {swap.Time.toLocaleString()}
                      </td>
                    </tr>
                  ))}



                </tbody>
              </table>

              <div className='my-4 bg-[#05071D] '>
                {buttonVisible && (
                  <div>
                    {SwappingData.length > displayCount && (
                      <div className='text-center mt-4'>
                        <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(displayCount + 5)}>
                          See More
                        </button>
                      </div>
                    )}

                    {SwappingData.length <= displayCount && (
                      <div className='text-center mt-4'>
                        <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(Math.min(5, SwappingData.length))}>
                          See Less
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Swapping
