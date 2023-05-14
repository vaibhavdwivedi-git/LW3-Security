const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const deployedGreeter = await Greeter.deploy("Namaste");

  await deployedGreeter.deployed();

  console.log("Deployed to:", deployedGreeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
