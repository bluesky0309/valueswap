import PartnerShipLogo from './assets/images/PartnerShipLogo.png'
import BraveWallet from './assets/images/BraveWallet.png'
import MetaMaskWallet from './assets/images/MetaMaskWallet.png'
import CoinBaseWallet from './assets/images/CoinBaseWallet.png'
import UniSwapWallet from './assets/images/UniSwapWallet.png'
import Etherum from './assets/images/etherum.png'
import Bitcoin from './assets/images/bitcoin.png'
import Solana from './assets/images/solana.png'
import icp from './assets/images/icp.png'
import Xrp from './assets/images/xrp.png'
import LiteCoin from './assets/images/Litecoin.png'
import RandomCoin from './assets/images/RandomCoin.png'
import { nanoid } from 'nanoid';

export const LandingPageNavbarData = {
    ButtonText: 'Explore Pools',
    Links: [
        {
            LinkName: 'Home',
            LinkId: 'home',
            LinkPath: '/',
        },
        {
            LinkName: 'Swap',
            LinkId: 'swap',
            LinkPath: '/dex-swap',
        },
        {
            LinkName: 'Pool',
            LinkId: 'pool',
            LinkPath: '/dex-swap/pool',
        },
        {
            LinkName: 'Staking',
            LinkId: 'staking',
            LinkPath: '/dex-staking',
        },
        {
            LinkName: 'Whitepaper',
            LinkId: 'whitepaper',
            LinkPath: '/dex-whitepaper',
        },
    ]
}

export const CommonNavbarData = {
    ButtonText: 'Connect Wallet',
    ButtonTextDisconnet: "Disconnect",
    Links: [
        {
            LinkName: 'Home',
            LinkId: 'home',
            LinkPath: '/',
        },
        {
            LinkName: 'Swap',
            LinkId: 'swap',
            LinkPath: '/dex-swap',
        },
        {
            LinkName: 'Pool',
            LinkPath: '/dex-swap/pool',
            LinkId: 'pool',
        },
        {
            LinkName: 'Portfolio',
            LinkPath: '/dex-swap/portfolio',
            LinkId: 'staking',
        },
        {
            LinkName: 'Whitepaper',
            LinkPath: '/',
            // LinkPath: '/dex-swap/whitepaper',
            LinkId: 'whitepaper',
        },
    ]
}

export const LandingPageData = {
    HeroSection: {
        HeadLineWordOne: "Empowering",
        HeadLineWordTwo: "Decentralized",
        HeadLineWordThree: "Finance",
        Tagline: "Leveraging Internet Computer Protocol for streamlined liquidity and asset management.",
        ExploreButton: 'Explore Pools',
        ConnectButton: 'Connect Wallet',
        DisconnectButton: 'Disconnect',
        BottomLine: 'Trade Securely, Trade Decentralized',
    },
    PaternshipPageData: {
        HeadingWordOne: 'Strategic',
        HeadingWordTwo: 'Partnerships',
        HeadingDescription: 'Partnering with leading technology and financial companies, we ensure our platform stands at the forefront of decentralized trading solutions.',

        PartnershipData: [
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            },
            {
                LogoLink: PartnerShipLogo,
                CompanyName: 'Balancer App',
                CompanyDesc: 'AMM/DEX'
            }
        ],

    },

    MethodsText: {
        UpperSection: {
            HeadingWordOne: "Our",
            HeadingWordTwo: "Innovative",
            HeadingWordThree: "techniques",
            Description: "By integrating Balancer-like liquidity pool techniques, our decentralized exchange offers unparalleled asset handling, empowering users with optimized trading and portfolio ",
            ButtonText: "Get Deatils",
        },
        LowerSection: {
            HeadingWordOne: "Unbeatable",
            HeadingWordTwo: "Rates",
            Description: "Enjoy the most competitive trading fees and benefit from our tiered liquidity provider rewards that incentivize deep liquidity provision and fair trading conditions",
            ButtonText: "Get Deatils",
        }
    },
    AboutSectionData: {

        Elementone: {
            WordOne: 'Why',
            WordTwo: 'Choose',
            WordThree: 'us?',
            Description: 'Dedicated to providing a modern trading environment, our platform integrates Balancer-like liquidity pools for optimized financial strategies.',
        },
        ElementTwo: {
            WordOne: 'Our',
            WordTwo: 'vision',
            Description: 'Driven by innovation, we aspire to redefine the landscape of decentralized exchanges by focusing on user-centric solutions',
        }, ElementThree: {
            WordOne: 'Key',
            WordTwo: 'features',
            Description: 'Our decentralized exchange harnesses the power of the Internet Computer Protocol to offer unprecedented trading capabilities and portfolio automation',
        },


    },

    LiquiditySectionData: {
        Box1: {
            NumberData: '1.58B',
            Description: 'Total Liquidity'
        },
        Box2: {
            SubBox1: {
                NumberData: '250.59M',
                Description: 'Swap Vol',
            },
            SubBox2: {
                NumberData: '170.30K',
                Description: 'Liquidity Provider',
            }
        },
        Box3: {
            NumberData: '7.5K',
            Description: 'Total Pools',
        }
    },
    WhitePaperText: {
        Heading: "Whitepapers Available",
        Description: 'Read our comprehensive whitepaper to understand the underlying technology, the mechanics of our DEX, and how we aim to revolutionize the way you trade and manage digital assets',
        ButtonText: 'Read Now',
    }

}


export const ConnectWalletData = {

    Array: [
        {
            Name: 'Brave Wallet',
            Image: BraveWallet
        },
        {
            Name: 'Metamask',
            Image: MetaMaskWallet
        },
        {
            Name: 'Coinbase Wallet',
            Image: CoinBaseWallet
        },
        {
            Name: 'Uniswap',
            Image: UniSwapWallet
        },
        {
            Name: 'ICP',
            Image: icp
        }
    ],
    TermsAndConditions: 'By connecting a wallet, you agree to [company name] Terms of Service and consent to its Privacy Policy.',
    LearnMore: 'Learn More',
    ButtonText: 'Connect Now',
    Heading: 'Connect Wallet',

}

export const SearchTokenData = {

    Array: [
        {
            Name: 'BitCoin',
            ShortForm: 'BTC',
            Image: Bitcoin,
        },
        {
            Name: 'Ethereum',
            ShortForm: 'ETH',
            Image: Etherum,
        },
        {
            Name: 'XRP',
            ShortForm: 'XRP',
            Image: Xrp,
        },
        {
            Name: 'Solana',
            ShortForm: 'SOL',
            Image: Solana,
        },
    ],
    Heading: 'Select Token',
    SearchBarPlaceHolder: 'Search token by Name'

}

export const SwapModalData = {
    Heading: 'SWAP',

    PaySection: {
        Heading: 'Pay',
        Balance: 'Balance',
        Max: 'Max',
        NoTokenSelectBalanceMessage: 'Select a Coin to Fetch Balance',
        TokenSelectButtonText: 'Select a Token',
    },

    RecieveSection: {
        Heading: 'Recieve',
        Balance: 'Balance',
        Max: 'Max',
        NoTokenSelectBalanceMessage: 'Select a Coin to Fetch Balance',
        TokenSelectButtonText: 'Select a Token',
    },
    bothCoinsPresent: {
        Price: 'Price',
        GasFees: 'GasFees',
    },
    ClickedSwapData: {
        MinimumRecieved: 'Minimum Recieved',
        OverallSlippage: 'Overall Slippage',
        LiquidityProviderIncentive: 'Liquidity Provider Incentive',
    },
    MainButtonsText: {
        InsufficientBalance: 'Insufficient Balance',
        ConfirmSwapping: 'Confirm Swapping',
        SwapNow: 'Swap Now',
        AnalysePair: 'Analyse Pair'
    },
    infoMessageMinimumRecieved: 'Your Transaction will be roll backed if there is a large price movement before its being confirmed',
    infoMessageOverallSlippage: 'It is the estimated difference between the market price and estimated price due to Trade size',
    infoMessageLiquidityProviderIncentive: `A portion of the trade goes to Liquidity 
    provider as their Incentive`,
}

export const TransactionSuccessfullData = {
    TransactionCompleteMessage: 'Transaction Completed Successfully!',
    TransactionSwapMessageFirstHalf: 'You Swap',
    TransactionSwapMessageSecondHalf: 'for',
    BackButtonText: 'Back to Profile',
}


export const AllPoolsData = {

    Headings: ['Tokens Composition', 'Pool Value',
        'Total Volume', 'APR'],

    TableData: [
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: 125625175,
            TotalVolume: 625175,
            APR: '0.50% - 0.95%'
        },
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: '$125,625,175',
            TotalVolume: '$625,175',
            APR: '0.50% - 0.95%'
        },
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: '$125,625,175',
            TotalVolume: '$625,175',
            APR: '0.50% - 0.95%'
        },
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: '$125,625,175',
            TotalVolume: '$625,175',
            APR: '0.50% - 0.95%'
        },
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: '$125,625,175',
            TotalVolume: '$625,175',
            APR: '0.50% - 0.95%'
        },
        {
            Tokens: [
                {
                    TokenName: 'CT',
                    ImagePath: RandomCoin,
                    Share: 75,
                },
                {
                    TokenName: 'LTC',
                    ImagePath: LiteCoin,
                    Share: 25,
                }
            ],
            PoolValue: '$125,625,175',
            TotalVolume: '$625,175',
            APR: '0.50% - 0.95%'
        }
    ],
    SeeMoreButtonText: "See More",
    SeeLessButtonText: "See Less",
}


export const CreatePoolsData = {
    HeadingText: 'Your Liquidity',
    HeadingButtonText: 'Create Pool',
    PersonalPools: [
        {
            Images: [
                RandomCoin,
                LiteCoin,
                Etherum
            ],
            TokenName: [
                'CT',
                '/LTC',
                '/ETH : : 50/25/25',
            ]
        },
        {
            Images: [
                RandomCoin,
                LiteCoin,
            ],
            TokenName: [
                'CT',
                '/LTC',
            ]
        },

    ]
}


export const portfolioSampleData = {
    SeeMoreButtonText: 'See more',
    SeeLessButtonText: 'See Less',
    Headings: ['Token Composition', 'Balance', 'Pool value', 'APR', 'Time'],
    TableData: [
        {
            PoolData: [
                {
                    Name: "BitCoin",
                    ShortForm: "BTC",
                    WeightedPercentage: 50,
                    ImagePath: Bitcoin,
                    Balance: 189050,
                    Value: 189050
                },
                {
                    Name: "LiteCoin",
                    ShortForm: "LTC",
                    WeightedPercentage: 25,
                    ImagePath: LiteCoin,
                    Balance: 189050,
                    Value: 189050
                },
                {
                    Name: "Ethereum",
                    ShortForm: "ETH",
                    WeightedPercentage: 25,
                    ImagePath: Etherum,
                    Balance: 189050,
                    Value: 189050
                },
            ],
            PoolMetaData: {
                Balance: 125625175,
                PoolValue: 125625175,
                APRstart: 0.05,
                APRend: 0.95,
                Time: new Date(),
                PoolId: nanoid(),
                TwentyFourHourFees: 950.859,
                TwentyFourHourVolume: 625175,
                PersonalPoolBalance: 189.05
            }
        },
        {
            PoolData: [
                {
                    Name: "BitCoin",
                    ShortForm: "BTC",
                    WeightedPercentage: 50,
                    ImagePath: Bitcoin,
                    Balance: 189050,
                    Value: 189050
                },
                {
                    Name: "LiteCoin",
                    ShortForm: "LTC",
                    WeightedPercentage: 50,
                    ImagePath: LiteCoin,
                    Balance: 189050,
                    Value: 189050
                },
            ],
            PoolMetaData: {
                Balance: 125625175,
                PoolValue: 125625175,
                APRstart: 0.05,
                APRend: 0.95,
                Time: new Date(),
                PoolId: nanoid(),
                TwentyFourHourFees: 950.859,
                TwentyFourHourVolume: 625175,
                PersonalPoolBalance: 200
            }
        }
    ]
}


export const PoolCompositionsData = {
    Headings: ['Token', 'Weightage', 'Balance', 'Value'],
    SeeMoreButtonText: "See More",
    SeeLessButtonText: "See Less"

}

export const SwappingTextData = {
    Headings: ['Swap', 'Value', 'Wallet ID', 'Time']
}
export const SwappingTableData = [
    {
        Enteries: [
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'BitCoin',
                    ImagePath: Bitcoin,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'LiteCoin',
                    ImagePath: LiteCoin,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            }
        ]
    },
    {
        Entries: [
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                FromToken: {
                    Name: 'Solana',
                    ImagePath: Solana,
                    Value: 1.0256
                },
                ToTokenn: {
                    Name: 'Xrp',
                    ImagePath: Xrp,
                    Value: 12.0256
                },
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            }
        ]
    }
]

export const LiquidityOverviewText = {
    Headings: ['Tokens', 'Value', 'Wallet ID', 'Time']
}
export const LiquidityOverviewData = [

    {
        Entries: [
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    }
                ],
                Impact: "Negative",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Negative",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            }
        ]
    },
    {
        Entries: [
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    }
                ],
                Impact: "Negative",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: RandomCoin,
                        Value: 1.0256
                    },
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Negative",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            },
            {
                Tokens: [
                    {
                        ImagePath: LiteCoin,
                        Value: 12.0256
                    }
                ],
                Impact: "Positive",
                Value: 189056,
                WalletId: 'abcdexjsbdjchbc1025',
                Time: new Date()
            }
        ]
    }
]



export const DummyDataTokens = {
    Tokens: [
        {   // Main Net
            CanisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
            // local net
            // CanisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
            Image: RandomCoin,
        },
        {
            // Main Net
            CanisterId: 'mxzaz-hqaaa-aaaar-qaada-cai',
            // local Net
            // CanisterId: 'mxzaz-hqaaa-aaaar-qaada-cai',
            Image: RandomCoin,
        }

    ]
}





