

async function main() {

    const DAI = await hre.ethers.getContractFactory("DAI");
    const dai = await DAI.deploy();
    await dai.deployed();
    console.log("Dai deployed to:", dai.address);
  
  
    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(dai.address);
    await vault.deployed(dai.address);
    console.log("Vault deployed to:", vault.address);
  
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  