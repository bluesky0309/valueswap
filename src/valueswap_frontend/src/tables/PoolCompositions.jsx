import React, { useEffect, useState } from 'react';
import { PoolCompositionsData } from '../TextData';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PoolCompositions = ({ TableData }) => {
    const [displayCount, setDisplayCount] = useState(Math.min(5, TableData?.length || 0));
    const [buttonVisible, setButtonVisibility] = useState(true);

    useEffect(() => {
        if (TableData?.length < 6) {
            setButtonVisibility(false);
        }
    }, [TableData]);

    return (
        <div className='mt-10 flex flex-col font-cabin'>
            <div className='-my-2 overflow-x-auto'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 border border-white border-opacity-65 rounded-lg'>
                        <SkeletonTheme baseColor="#1f2029" highlightColor="#2b2b2b" borderRadius="0.5rem" duration={2}>
                            <table className='min-w-full divide-y divide-gray-300'>
                                <thead>
                                    <tr>
                                        {PoolCompositionsData.Headings.map((heading, index) => (
                                            <th
                                                scope='col'
                                                key={index}
                                                className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white'
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='bg-[#000711]'>
                                    {!TableData ? (
                                        Array.from({ length: 5 }).map((_, index) => (
                                            <tr key={index}>
                                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                                    <Skeleton height={30} />
                                                </td>
                                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                                    <Skeleton height={30} />
                                                </td>
                                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                                    <Skeleton height={30} />
                                                </td>
                                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                                    <Skeleton height={30} />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        TableData.slice(0, displayCount).map((token, index) => (
                                            <tr key={index}>
                                                <td className='min-w-52 whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-6 justify-center'>
                                                    <span className='bg-[#3D3F47] p-1 rounded-lg'>
                                                        <img src={token.ImagePath} alt="" className='w-8 h-8 transform scale-125' />
                                                    </span>
                                                    <span>{token.ShortForm}</span>
                                                    <span>{token.WeightedPercentage} %</span>
                                                </td>
                                                <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                                                    {token.WeightedPercentage} %
                                                </td>
                                                <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                                                    $ {token.Balance.toLocaleString('en-US')}
                                                </td>
                                                <td className='whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                                                    $ {token.Value.toLocaleString('en-US')}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className='flex justify-center items-center mb-8'>
                                {buttonVisible && (
                                    <div>
                                        {TableData?.length > displayCount && (
                                            <div className='text-center mt-4'>
                                                <button
                                                    className='bg-gray-800 text-white px-4 py-2 rounded-md'
                                                    onClick={() => setDisplayCount(displayCount + 5)}
                                                >
                                                    {PoolCompositionsData.SeeMoreButtonText}
                                                </button>
                                            </div>
                                        )}
                                        {TableData?.length <= displayCount && (
                                            <div className='text-center mt-4'>
                                                <button
                                                    className='bg-gray-800 text-white px-4 py-2 rounded-md'
                                                    onClick={() => setDisplayCount(Math.min(5, TableData.length))}
                                                >
                                                    {PoolCompositionsData.SeeLessButtonText}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoolCompositions;
