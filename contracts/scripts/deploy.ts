import { ethers } from "hardhat";


async function main() {
  console.log("🚀 Starting deployment to Sepolia...");
  const [deployer] = await ethers.getSigners();
  const userAddress = deployer.address;

  try {
    // Deploy Token A
    const MyToken = await ethers.getContractFactory("LPToken");
    const tokenA = await MyToken.deploy();
    await tokenA.waitForDeployment();
    await tokenA.mint(userAddress, ethers.parseUnits("1000", 18));
    console.log("💰 Minted 1000 TokenA"); 
    console.log(`✅ TokenA deployed at: ${tokenA.target}`);

    // Deploy Token B
    const tokenB = await MyToken.deploy();
    await tokenB.waitForDeployment();
    console.log(`✅ TokenB deployed at: ${tokenB.target}`);
    await tokenB.mint(userAddress, ethers.parseUnits("1000", 18));
    console.log("💰 Minted 1000 TokenB");

    // Deploy Factory
    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();
    console.log(`🏭 Factory deployed at: ${factory.target}`);

    // Create a Pair
    const createTx = await factory.createPair(tokenA.target, tokenB.target);
    await createTx.wait();
    const pairAddress = await factory.getPair(tokenA.target, tokenB.target);
    console.log(`🔁 Pair created at: ${pairAddress}`);

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
