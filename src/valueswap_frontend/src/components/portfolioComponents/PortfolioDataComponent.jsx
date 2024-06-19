import React, { useEffect, useState } from 'react'
import GradientButton from '../../buttons/GradientButton';
import NoPortfolioImage from '../../assets/images/NoPortfolioImage.png'
import { portfolioSampleData } from '../../TextData';
import { useNavigate } from 'react-router-dom';

const PortfolioDataComponent = () => {

    const [displayCount, setDisplayCount] = useState(Math.min(5, portfolioSampleData.TableData.length));
    const [buttonVisible, setButtonVisibility] = useState(true);
    useEffect(() => {
        if (portfolioSampleData.TableData.length < 6) {
            setButtonVisibility(false)
        }
    }, [portfolioSampleData.TableData])

    const navigate = useNavigate();
    return (
        <div className=' w-full h-screen relative '> 
        <div className='w-full h-screen  text-white  md:max-w-[80%] mt-12 z-50 px-8 mx-auto absolute md:translate-x-[15%]'>

            <div className='flex justify-between bg-[#010427] p-2  pb-6 pt-8  rounded-lg mx-auto'>
                <div className='flex justify-between items-center  mx-2  md:mx-16'>
                    <span className='font-cabin text-xl md:text-3xl font-medium'>My Liquidity Pools</span>
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
                            <table className='min-w-full   '>
                                <thead className=' '>
                                    <tr className=''>
                                        {portfolioSampleData.Headings.map((heading, index) => (
                                            <th scope='col'
                                                key={index}
                                                className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white '
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className=' '>
                                    {portfolioSampleData.TableData.slice(0, displayCount).map((pool, index) => (
                                        <tr key={index} className='hover:bg-[#546093] rounded-xl  cursor-pointer'
                                            onClick={() => {
                                                navigate(`/dex-swap/portfolio/pool-info/${index}`)
                                            }}  
                                        >

                                            <td className='min-w-80 whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-5 justify-start ml-8'>
                                                <span className='flex gap-2'>
                                                    {pool.PoolData.map((token, index) => (
                                                        <span key={index} className='bg-[#3D3F47] p-2 rounded-xl'>
                                                            <img src={token.ImagePath} alt="" className=' w-4 h-4 md:w-6 md:h-6' />
                                                        </span>
                                                    ))}
                                                </span>

                                                <span className='flex items-center'>
                                                    <span>
                                                        {pool.PoolData[0].ShortForm}
                                                    </span>
                                                    <span>
                                                        {
                                                            pool.PoolData.slice(1).map((token, index) => (
                                                                <span key={index}>/{token.ShortForm}</span>
                                                            ))
                                                        }
                                                    </span>
                                                    <span>: :</span>
                                                    <span>{pool.PoolData[0].WeightedPercentage}</span>
                                                    <span>
                                                        {
                                                            pool.PoolData.slice(1).map((token, index) => (
                                                                <span key={index}>/{token.WeightedPercentage}</span>
                                                            ))
                                                        }
                                                    </span>
                                                </span>


                                            </td>

                                            <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                                                $ {pool.PoolMetaData.Balance.toLocaleString('en-US')}
                                            </td>
                                            <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                                                $ {pool.PoolMetaData.PoolValue.toLocaleString('en-US')}
                                            </td>
                                            <td className='whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                                                {pool.PoolMetaData.APRstart}% - {pool.PoolMetaData.APRend}%
                                            </td>
                                            <td className='whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                                                {pool.PoolMetaData.Time.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}




                                </tbody>
                            </table>
                            <div className='flex justify-center items-center mb-8'>
                                {buttonVisible && (
                                    <div>
                                        {portfolioSampleData.TableData.length > displayCount && (
                                            <div className='text-center mt-4'>
                                                <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(displayCount + 5)}>
                                                    {portfolioSampleData.SeeMoreButtonText}
                                                </button>
                                            </div>
                                        )}

                                        {portfolioSampleData.TableData.length <= displayCount && (
                                            <div className='text-center mt-4'>
                                                <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(Math.min(5, AllPoolsData.TableData.length))}>
                                                    {portfolioSampleData.SeeLessButtonText}
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

export default PortfolioDataComponent
