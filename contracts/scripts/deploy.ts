import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment to Sepolia...");

  // Deploy Token A
  const initialSupply = ethers.parseEther("1000000");
  const MyToken = await ethers.getContractFactory("MyToken");
  const tokenA = await MyToken.deploy(initialSupply);
  await tokenA.waitForDeployment();
  console.log(`✅ TokenA deployed at: ${tokenA.target}`);

  // Deploy Token B
  const tokenB = await MyToken.deploy(initialSupply);
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
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
