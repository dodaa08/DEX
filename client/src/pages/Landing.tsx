import SwapCard from "../components/Landing/SwapCard";
import MintToken from "./Mint";
import Header from "../components/Landing/Header";
import { useState } from "react";

const Landing = () => {
  const [showTrade, setshowtrade] = useState(true);
  const [showPool, setshowpool] = useState(false);
  const [showMint, setshowmint] = useState(false);

  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10">
        <div className="w-full max-w-7xl mx-auto py-8 px-6">
          <Header
            onShowTrade={() => {
              setshowtrade(true);
              setshowpool(false);
              setshowmint(false);
            }}
            onShowPool={() => {
              setshowtrade(false);
              setshowpool(true);
              setshowmint(false);
            }}
            onShowMint={() => {
              setshowtrade(false);
              setshowpool(false);
              setshowmint(true);
            }}
          />
        </div>
        
        {showTrade && (
          <div className="py-10">
            <SwapCard />
          </div>
        )}

        {showMint && (
          <div className="py-40">
            <MintToken />
          </div>
        )}

        {showPool && (
          <div>
            {/* Pool content will go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;


