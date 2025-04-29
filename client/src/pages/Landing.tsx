import SwapCard from "../components/Landing/SwapCard";
import MintToken from "./Mint";
import Header from "../components/Landing/Header";
import { useState } from "react";
import AddLiquidity from "../components/Liquidity/AddLiquidity";

const Landing = () => {
  const [showTrade, setShowTrade] = useState(true);
  const [showPool, setShowPool] = useState(false);
  const [showMint, setShowMint] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Crypto Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Side Icons */}
        <img
          src="https://imgs.search.brave.com/PNOo568ygD9SRI_1SyGxZn3jKt8VmcfHA2WRxI_ZIrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/Y2pkb3duZXIvY3J5/cHRvY3VycmVuY3kt/ZmxhdC81MTIvRXRo/ZXJldW0tRVRILWlj/b24ucG5n"
          alt="Ethereum"
          className="absolute top-10 left-10 w-20 h-20 blur-sm opacity-70 animate-float hover:scale-110 transition-transform duration-300"
        />
        <img
          src="https://imgs.search.brave.com/gV-m_NFXEg7v7wLu6ZayS6Ca99s69HiMw-Xav8AAVvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvY3J5cHRvLWNv/aW5zLTcvMzIvVVNE/Q191c2RfY29pbi01/MTIucG5n"
          alt="USDT"
          className="absolute bottom-20 left-20 w-16 h-16 blur-sm opacity-80 animate-float delay-400 hover:scale-110 transition-transform duration-300"
        />
        {/* <img
          src="https://imgs.search.brave.com/GwXTokyWfplKnoPqAzYAApxXBExz9xvPbnJ2DFtfpWc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3NvbGFu/YTEyNDMubG9nb3dp/ay5jb20ud2VicA"
          alt="Solana"
          className="absolute top-1/4 left-1/2 w-18 h-18 blur-sm opacity-75 animate-float delay-800 hover:scale-110 transition-transform duration-300"
        /> */}
        <img
          src="https://imgs.search.brave.com/QZ2W_lpK8krdloZ9MP0mzyi6olMQqUmlZ2VWrd3E7G8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvY3J5cHRvLWN1/cnJlbmN5LWFuZC1j/b2luLTIvMjU2L2Nh/cmRhbm9fYWRhLTUx/Mi5wbmc"
          alt="Cardano"
          className="absolute bottom-1/3 left-1/4 w-22 h-22 blur-md opacity-65 animate-float delay-1000 hover:scale-110 transition-transform duration-300"
        />
        <img
          src="https://imgs.search.brave.com/DWF6kFCxOaB05OswdviDeG5zn422T0btyZspqj9QO2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9iaXRjb2lu/LWljb24tNTEyeDUx/Mi02bHdzZTlqay5w/bmc"
          alt="Bitcoin"
          className="absolute top-1/3 left-5 w-24 h-24 blur-md opacity-60 animate-float delay-200 hover:scale-110 transition-transform duration-300"
        />

        {/* Right Side Icons */}
        <img
          src="https://imgs.search.brave.com/Z2D69To1lgd90hi3qBD06IK0SXjEK60E5VU5pI1EdPY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdGxh/cy1jb250ZW50LWNk/bi5waXhlbHNxdWlk/LmNvbS9zdG9jay1p/bWFnZXMvdW5pc3dh/cC1pY29uLWNyeXB0/b2N1cnJlbmN5LTY0/RXg5eUEtNjAwLmpw/Zw"
          alt="Uniswap"
          className="absolute bottom-10 right-1/3 w-20 h-20 blur-md opacity-70 animate-float delay-600 hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="w-full max-w-7xl mx-auto py-8 px-6">
          <Header
            onShowTrade={() => {
              setShowTrade(true);
              setShowPool(false);
              setShowMint(false);
            }}
            onShowPool={() => {
              setShowTrade(false);
              setShowPool(true);
              setShowMint(false);
            }}
            onShowMint={() => {
              setShowTrade(false);
              setShowPool(false);
              setShowMint(true);
            }}
          />
        </div>  

        {/* Headline */}
       

        {/* Dynamic Content */}
        <div className="flex justify-center items-center py-20">
          {showTrade && (
            <div className="transition-transform flex flex-col gap-12 transform duration-500 ease-in-out">
               <div className="text-center ">
          <h1 className="text-5xl font-bold text-white">
               Swap your Assets
          </h1>
          <p className="text-lg text-gray-400 mt-4">
            Trade, Mint, and Add Liquidity with ease and security.
          </p>
        </div>
              <SwapCard />
            </div>
          )}

          {showMint && (
            <div className="transition-transform transform duration-500 ease-in-out">
              <MintToken />
            </div>
          )}

          {showPool && (
            <div className="transition-transform transform duration-500 ease-in-out">
              <AddLiquidity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;


