import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment to Sepolia...");
  const [deployer] = await ethers.getSigners();
  const userAddress = deployer.address;

  try {
    // 1. Deploy TokenA
    const MintableToken = await ethers.getContractFactory("MintableToken");
    const tokenA = await MintableToken.deploy("TokenA", "TKA");
    await tokenA.waitForDeployment();
    await tokenA.mint(userAddress, ethers.parseUnits("1000", 18));
    console.log(`✅ TokenA deployed at: ${tokenA.target}`);

    // 2. Deploy TokenB
    const tokenB = await MintableToken.deploy("TokenB", "TKB");
    await tokenB.waitForDeployment();
    await tokenB.mint(userAddress, ethers.parseUnits("1000", 18));
    console.log(`✅ TokenB deployed at: ${tokenB.target}`);

    // 3. Deploy LPToken (for liquidity rewards)
    const LPToken = await ethers.getContractFactory("LPToken");
    const lpToken = await LPToken.deploy();
    await lpToken.waitForDeployment();
    console.log(`✅ LPToken deployed at: ${lpToken.target}`);

    // 4. Deploy SimpleDEX
    const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
    const simpleDex = await SimpleDEX.deploy(tokenA.target, tokenB.target, lpToken.target);
    await simpleDex.waitForDeployment();
    console.log(`✅ SimpleDEX deployed at: ${simpleDex.target}`);

    // 5. Transfer LPToken ownership to DEX
    const tx = await lpToken.transferOwnership(simpleDex.target);
    await tx.wait();
    console.log(`✅ Ownership of LPToken transferred to SimpleDEX`);

    console.log("✨ Deployment completed successfully!");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
