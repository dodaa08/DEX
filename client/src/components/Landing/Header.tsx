import { Activity } from "lucide-react";
import ConnectBtn  from "./ConnectBtn"


const Header = () => {

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Nav */}
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-5 text-white cursor-pointer">
          <Activity className="w-5 h-5" />
          <button className="text-2xl text-blue-400 font-sans cursor-pointer">CornSwap</button>
        </div>
        <button className="text-xl text-white/95 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors">Trade</button>
        <button className="text-xl text-white/95 font-sans cursor-pointer mt-1 hover:text-blue-400 transition-colors">Pools</button>
      </div>

      <div>
        <ConnectBtn />
      <div>
       
    </div>
      </div>
     
    </div>
  );
};


export default Header;