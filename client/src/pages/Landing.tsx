import Header from "@/components/Landing/Header";
import SwapCard from "@/components/Landing/SwapCard";

const Landing = () => {
  return (
    <div className="bg-black/95 min-h-screen flex flex-col items-center px-6">
      <div className="w-full max-w-7xl py-8">
        <Header />
      </div>

      <div className="w-full max-w-7xl py-8">
       <SwapCard />  
      </div>       

    </div>
  );
};

export default Landing;


