import { Activity } from "lucide-react";
import ConnectBtn from "./ConnectBtn";
import { FC } from "react";
import { Link } from "react-router-dom";

interface HeaderC {
  onShowTrade: () => void;
  onShowMint: () => void;
  onShowPool: () => void;
}

const Header: FC<HeaderC> = ({ onShowTrade, onShowMint, onShowPool }) => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Nav */}
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-5 text-white cursor-pointer">
          <Activity className="w-5 h-5" />
          <Link to="/">
            <button className="text-2xl text-blue-400 font-sans cursor-pointer">OrbitalSwap</button>
          </Link>
        </div>
        <button onClick={onShowTrade} className="text-xl text-white/95 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors">Trade</button>
        <button onClick={onShowPool} className="text-xl text-white/95 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors">Pools</button>
        <button onClick={onShowMint} className="text-xl text-white/95 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors">Mint</button>
      </div>

      <div>
        <ConnectBtn />
      </div>
    </div>
  );
};

export default Header;
