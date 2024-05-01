
import TronWeb from 'tronweb';
import { swap } from './SwapToken';
import { Chain, ChainId, Token } from 'symbiosis-js-sdk';
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

// Initialize TronWeb with the appropriate provider
// const tronWeb = new TronWeb({
//   fullHost: 'https://api.trongrid.io', // Replace with your preferred provider
// });

function SymbiosisCall() {
    const {address} = useWallet();
    // console.log(useWalle3t());
    const symbiosisTest = async () => {
            
            // Define TRON_USDT and SEPOLIA_USDT addresses
            const TRON_USDT_ADDRESS = "0x42A1E39AEFA49290F2B3F9ED688D7CECF86CD6E0";
            const SEPLOLIA_WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";

            // Create token objects
            const TRON_USDT = new Token({
                chainId: ChainId.TRON_TESTNET,
                address: TRON_USDT_ADDRESS,
                isNative: false,
                symbol: 'USDT',
                decimals: 6,
            });

            const SEPOLIA_USDT = new Token({
                chainId: ChainId.SEPOLIA_TESTNET,
                address: SEPLOLIA_WETH_ADDRESS,
                symbol: 'WETH',
                isNative: false,
                decimals: 18,
            });

            await swap({
                assetIn: TRON_USDT,
                assetOut: SEPOLIA_USDT,
                chainIn: 2494104990,
                chainOut: 11155111,
                address:address

            });
    }

    return (
        <div><button onClick={symbiosisTest}>Test</button></div>
    )
}

export default SymbiosisCall