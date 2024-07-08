import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import { SearchTokenData, DummyDataTokens } from '../TextData';
import { useSelector } from 'react-redux';
// import GradientButton from '../buttons/GradientButton';
// import { SiBitcoinsv } from "react-icons/si";
// import { CiSearch } from "react-icons/ci";
import { useAuth } from '../components/utils/useAuthClient';
import SearchIcon from '@mui/icons-material/Search';

const SearchToken = ({ setSearchToken, setPayToken, setRecToken, id, setTokenData }) => {

    const { createTokenActor } = useAuth();

    const { Tokens } = useSelector(state => state.pool)
    const [TokenOption, SetTokenOption] = useState(null);
    const ImagePath = DummyDataTokens.Tokens[0].Image
    const [searchQuery, setSearchQuery] = useState('');
    const [metadata, setMetadata] = useState([]);
    const [filteredTokens, setFilteredTokens] = useState(SearchTokenData.Array.filter(token => {

        return Tokens.some(Token =>
            Token.ShortForm == token.ShortForm
        )
    }))
    const HandleClickToken = (index) => {
        console.log("token selected", index)
        SetTokenOption(TokenOption === index ? null : index);
    }

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setFilteredTokens(
                metadata.filter((tokenMeta) => {
                    const TokenName = tokenMeta.metadata[1][1].Text;
                    return TokenName.toLowerCase().includes(searchQuery.toLowerCase());
                })
            );
        } else {
            setFilteredTokens(metadata);
        }
    }, [searchQuery, metadata]);



    useEffect(() => {
        const fetchMetadata = async () => {
            const fetchedMetadata = await Promise.all(
                DummyDataTokens.Tokens.map(async (token) => {
                    const tokenActor = createTokenActor(token.CanisterId);
                    const result = await tokenActor.icrc1_metadata();
                    console.log(`result of canisterId in UseEffect ${token.CanisterId}`, result);
                    return {
                        CanisterId: token.CanisterId,
                        metadata: result
                    };
                })
            );

            console.log("Fetched Data:---->", fetchedMetadata);
            setMetadata(fetchedMetadata);
            setFilteredTokens(fetchedMetadata);
        };

        fetchMetadata();
    }, [DummyDataTokens]);


    return (
        <div className='flex z-50 justify-center fixed inset-0  bg-opacity-50 backdrop-blur-sm'>
            <div className=' h-fit md:w-[60%] lg:w-[40%]  border rounded-xl flex flex-col gap-2 bg-[#05071D] my-auto mx-auto'>
                <div className='w-[90%] flex justify-center mx-4'>
                    <span className='font-fahkwang font-medium mx-auto md:text-2xl text-xl py-4'>
                        {SearchTokenData.Heading}
                    </span>
                    <span className='cursor-pointer self-center' onClick={() => setSearchToken(false)}>
                        <X />
                    </span>
                </div>


                <div className='border border-transparent font-bold custom-height-3 bg-gradient-to-r from-transparent via-[#00308E] to-transparent w-full mx-auto'></div>
                <div className='flex m-4 w-10/12 mx-auto font-cabin font-normal text-xl'>
                    <input
                        type='text'
                        placeholder='Search token by Name'
                        className='w-full   rounded-s-lg outline-none text-white bg-[#303030] placeholder-gray-400  p-2'
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <div className='bg-[#C16800] rounded-e-lg px-5 py-2 items-center flex gap-x-1'>
                        <div className='hidden lg:block'>
                        <SearchIcon />
                        </div>
                        <button >Search</button>

                    </div>
                </div>

                <div className='flex flex-col items-center gap-4 mb-10'>
                    {filteredTokens.map((token, index) => {


                        const tokenMetadata = metadata.find(meta => meta.CanisterId === token.CanisterId);
                        const TokenName = tokenMetadata?.metadata[1]?.[1]?.Text;
                        const CanisterId = token.CanisterId;
                        const ShortForm = tokenMetadata?.metadata[2]?.[1]?.Text;

                        return (
                            <div className={`flex gap-6 items-center w-10/12  p-2 bg-[#303030] hover:opacity-80 cursor-pointer  opacity-100 rounded-xl
                            ${TokenOption === index ? ' font-bold opacity-100 border bg-gradient-to-r from-[#000711] via-[#525E91] to-[#000711]' : ''}`} key={index}
                                onClick={() => {
                                    if (id === 1) setPayToken({
                                        Name: TokenName,
                                        ImagePath: ImagePath,
                                        ShortForm: ShortForm,
                                        CanisterId: CanisterId

                                    })
                                    if (id === 2) setRecToken({
                                        Name: TokenName,
                                        ImagePath: ImagePath,
                                        ShortForm: ShortForm,
                                        CanisterId: CanisterId
                                    })
                                    if (id === 3) {
                                        setTokenData({
                                            Name: TokenName,
                                            ImagePath: ImagePath,
                                            ShortForm: ShortForm,
                                            CanisterId: CanisterId
                                        })
                                    }
                                    HandleClickToken(index);
                                    setSearchToken(false)
                                }}>
                                <div className='rounded-lg bg-[#3D3F47] p-4'>
                                    <img src={ImagePath} alt="" className='h-8 w-8 transform scale-150' />
                                </div>
                                <div className='font-normal text-xl font-cabin text-start'>
                                    {TokenName}
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
                <div className='border border-transparent font-bold custom-height-3 bg-gradient-to-r from-transparent via-[#00308E] to-transparent w-full mx-auto'></div>

            </div>

        </div >
    )
}

export default SearchToken