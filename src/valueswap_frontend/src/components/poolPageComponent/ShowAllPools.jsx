import React, { useState, useEffect } from 'react'
import { poolsSvg } from './PoolPageComponentsSvg'
import GradientButton from '../../buttons/GradientButton'
import { AllPoolsData } from '../../TextData'
import { useNavigate } from 'react-router-dom'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const ShowAllPools = () => {
  const [allDataInPool, setAllDataInPool] = useState(AllPoolsData);
  console.log(allDataInPool)
  const [displayCount, setDisplayCount] = useState(Math.min(5, allDataInPool?.TableData?.length || 0));
  const [buttonVisible, setButtonVisibility] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [activeSort, setActiveSort] = useState()
  useEffect(() => {
    if (allDataInPool?.TableData?.length < 6) {
      setButtonVisibility(false);
    }
  }, [allDataInPool.TableData]);
/// pool value sort 
  const sortValue = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aValue = typeof a.PoolValue === 'string' ? parseFloat(a.PoolValue.replace(/[\$,]/g, '')) : a.PoolValue;
      const bValue = typeof b.PoolValue === 'string' ? parseFloat(b.PoolValue.replace(/[\$,]/g, '')) : b.PoolValue;
      return isAscending ? bValue - aValue : "";
    });

    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
    console.log("u just click")
  };

  ///pool Total volume sort 

  const sortTotalVolume = () =>{
    const sortedTableData = [...allDataInPool.TableData].sort((a,b) => {
      const aVolume = typeof a.TotalVolume === 'string' ? parseFloat(a.TotalVolume.replace(/[\$,]/g, '')): a.TotalVolume;
      const bVolume = typeof b.TotalVolume === 'string' ? parseFloat(b.TotalVolume.replace(/[\$,]/g, '')): b.TotalVolume;
      return isAscending ? bVolume -aVolume: "";
    })
    setAllDataInPool({...allDataInPool, TableData: sortedTableData});
    setIsAscending(!isAscending);
  }

//APR sort 

  // Helper function to parse APR values
  const parseAPR = (aprString) => {
    const matches = aprString.match(/(\d+\.\d+)% - (\d+\.\d+)%/);
    if (matches) {
      return {
        min: parseFloat(matches[1]),
        max: parseFloat(matches[2]),
      };
    }
    return null;
  };

 
  // Sort by APR
  const sortApr = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aprA = parseAPR(a.APR);
      const aprB = parseAPR(b.APR);

      if (aprA && aprB) {
        if (isAscending) {
          return aprB.min - aprA.min || aprB.max - aprA.max;
        } else {
          return;
        }
      }
      return 0;
    });
    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
  };

  const sortingConditional = (poolIndex) =>{
    if(poolIndex == 1){
      sortValue()
      setActiveSort(poolIndex)

    }else if(poolIndex == 2){
      sortTotalVolume()
      setActiveSort(poolIndex)
    }else if(poolIndex == 3){
      sortApr()
      setActiveSort(poolIndex)
    }
    }
  
  const navigate = useNavigate();
  return (
    <div className='relative w-full h-screen '>

      <div className='w-full h-screen  text-white md:max-w-[80%] mt-4 z-20 sm:px-8 mx-auto absolute md:translate-x-[15%] '>

        <div className='flex justify-between bg-[#010427] p-2 pb-6 pt-6 rounded-t-lg mx-auto'>
          <div className='flex items-center justify-between gap-4 mx-8 md:gap-16 md:mx-16'>
            <span className='font-medium text-white font-cabin md:text-3xl' >Ethereum Pools</span>
            <div className='cursor-pointer'>
              {poolsSvg}
            </div>
          </div>

          <div className='mr-4'
            onClick={() => {
              navigate('/dex-swap/pool/create-pool');
            }}>
            <GradientButton CustomCss={`hover:opacity-75 text-xs md:text-base lg:text-base h-[45px] w-[120px] py-2 lg:py-4`}>
              Create Pool
            </GradientButton>
          </div>
        </div>

        <div className='flex flex-col font-cabin bg-[#05071D] '>
          <div className='-my-2 overflow-x-auto'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 '>
                <table className='min-w-full '>
                  <thead className=''>
                    <tr className=''>
                      {allDataInPool?.Headings?.map((heading, index) => (
                        <th scope='col'
                          key={index}
                          className='pl-6 pr-3 text-sm font-medium text-center text-white py-7 md:text-base lg:text-xl '
                        >
                          <span className='flex items-center justify-center gap-2' onClick={()=> sortingConditional(index)}>
                            {heading}
                           {index === activeSort ? <ArrowDownwardIcon  sx={{color: ""}}/>: ""}
                          </span>
                          
                        </th>
                      ))}
                    </tr>
                    
                  </thead>
                  <tbody className=''>
                    {allDataInPool?.TableData?.slice(0, displayCount).map((pool, index) => {

                      const TokenPool = pool.Tokens
                      const FirstTokenName = pool.Tokens[0].TokenName
                      const FirstTokenShare = pool.Tokens[0].Share
                      return (
                        <tr key={index}>

                          <td className='flex items-center justify-center gap-5 my-4 text-sm font-medium text-white min-w-52 whitespace-nowrap md:text-base'>
                            <span className='flex gap-2'>
                              {TokenPool?.map((token, index) => (
                                <span key={index} className='bg-[#3D3F47] p-2 rounded-xl'>
                                  <img src={token.ImagePath} alt="" className='w-6 h-6' />
                                </span>
                              ))}
                            </span>

                            <span className='flex items-center'>
                              <span>
                                {FirstTokenName}
                              </span>
                              <span>
                                {
                                  TokenPool?.slice(1).map((token, index) => (
                                    <span key={index}>/{token.TokenName}</span>
                                  ))
                                }
                              </span>
                              <span>: :</span>
                              <span>{FirstTokenShare}</span>
                              <span>
                                {
                                  pool.Tokens?.slice(1).map((token, index) => (
                                    <span key={index}>/{token.Share}</span>
                                  ))
                                }
                              </span>
                            </span>


                          </td>

                          <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                            $ {pool.PoolValue.toLocaleString('en-US')}
                          </td>
                          <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                            $ {pool.TotalVolume.toLocaleString('en-US')}
                          </td>
                          <td className='py-4 pl-3 pr-6 text-sm font-medium text-center whitespace-nowrap md:text-base'>
                            {pool.APR}
                          </td>
                        </tr>
                      )
                    })}




                  </tbody>
                </table>
                <div className='flex items-center justify-center mb-24'>
                  {buttonVisible && (
                    <div>
                      {allDataInPool?.TableData?.length > displayCount && (
                        <div className='mt-4 text-center'>
                          <button className='px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-600' onClick={() => setDisplayCount(displayCount + 5)}>
                            {allDataInPool.SeeMoreButtonText}
                          </button>
                        </div>
                      )}

                      {allDataInPool?.TableData?.length <= displayCount && (
                        <div className='mt-4 text-center'>
                          <button className='px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-600' onClick={() => setDisplayCount(Math.min(5, allDataInPool.TableData.length))}>
                            {allDataInPool.SeeLessButtonText}
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

      </div>
    </div>
  )
}

export default ShowAllPools
