import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment to Sepolia...");

  try {
    // Deploy Token A
    const MyToken = await ethers.getContractFactory("LPToken");
    const tokenA = await MyToken.deploy();
    await tokenA.waitForDeployment();
    console.log(`✅ TokenA deployed at: ${tokenA.target}`);

    // Deploy Token B
    const tokenB = await MyToken.deploy();
    await tokenB.waitForDeployment();
    console.log(`✅ TokenB deployed at: ${tokenB.target}`);

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
