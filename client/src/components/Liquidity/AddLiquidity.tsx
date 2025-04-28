import { motion } from "framer-motion";

export const AddLiquidity = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center py-10"
    >
      <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-white">Add Liquidity</h1>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/30 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Input</span>
              <span className="text-sm text-gray-400">Balance: 0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="number"
                placeholder="0.0"
                className="bg-transparent text-white text-xl w-full focus:outline-none"
              />
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-xl">
                <span className="text-white">TKA</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="bg-black/50 rounded-full p-2 border border-gray-800">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          <div className="bg-black/30 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Input</span>
              <span className="text-sm text-gray-400">Balance: 0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="number"
                placeholder="0.0"
                className="bg-transparent text-white text-xl w-full focus:outline-none"
              />
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-xl">
                <span className="text-white">TKB</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-2xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price</span>
                <span className="text-white">0.0 TKA per TKB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Share of Pool</span>
                <span className="text-white">0%</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Add Liquidity
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddLiquidity;