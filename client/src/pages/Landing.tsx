import SwapCard from "@/components/Landing/SwapCard";
import MintToken from "./Mint";
import Header from "../components/Landing/Header";
import { useState} from "react";

const Landing = () => {
  const [showTrade, setshowtrade] = useState(true);
  const [showPool, setshowpool] = useState(false);
  const [showMint, setshowmint] = useState(false);

  return (
    <div className="bg-black/95 min-h-screen flex flex-col items-center px-6">
      <div className="w-full max-w-7xl py-8">
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
      

      {
        showTrade && 
        <>
         <div className="py-10">
       <SwapCard />  
      </div>
        </>
      }

      {
          showMint && 
          <>
          <div className="py-40">
          <MintToken />
          </div>
          </> 
      }

      {
        showPool && 
        <>
        
        </>
      }

    </div>
  );
};

export default Landing;


