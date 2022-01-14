const { expect } = require("chai");
const { ethers } = require("hardhat");

// If you need to send a transaction from an account (or Signer in ethers.js speak) other than the default one to test your code, you can use the connect() method in your ethers.js Contract to connect it to a different account. 


// describe("Testing DAI Token", function () {

//   let owner, DAI, dai, Vault, vault;

//   beforeEach(async function() {
//     // Deployment
//     [owner] = await ethers.getSigners();

//     DAI = await hre.ethers.getContractFactory("DAI");
//     dai = await DAI.deploy();
//     await dai.deployed();
//     console.log("Dai deployed to:", dai.address);
//     console.log("owner is: ", owner.address);

//   })

//   it("Should return balance of the owner (deployer) ", async function () {

//     const tx1 = await dai.balanceOf(owner.address);
//     console.log(tx1.toString())
  
//   })
// })



// describe("Testing Vault Token", function () {

//   it("Should return balance, owner, name and symbol", async function () {

//     const [owner, addr1] = await ethers.getSigners();

//     const Vault = await hre.ethers.getContractFactory("Vault");
//     const vault = await Vault.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3");
//     await vault.deployed();
//     console.log("Vault deployed to:", vault.address);
//     console.log("owner is: ", owner.address, ', addr1 is: ', addr1.address);

//     const tx0 = await vault._owner();
//     const tx1 = await vault.balanceOf(owner.address);
//     const tx2 = await vault.name();
//     const tx3 = await vault.symbol();

//     console.log(`Balance of ${tx1}: ${tx1.toString()}
//     Owner: ${tx0}
//     Token name: ${tx2}
//     Token symbol: ${tx3}
//     `);
  
//   })
// })



// describe("Testing balance transfers", function() {

//   it("Should 'transfer' balance from owner to user", async () => {

//     const [owner, addr1] = await ethers.getSigners();

//     // Deploying DAI token first
//     DAI = await hre.ethers.getContractFactory("DAI");
//     dai = await DAI.deploy();
//     await dai.deployed();
//     console.log("Dai deployed to:", dai.address);

//     // Depoying vault and instantiating DAI
//     const Vault = await hre.ethers.getContractFactory("Vault");
//     const vault = await Vault.deploy(dai.address);
//     await vault.deployed();
//     console.log(`Vault deployed to: ${vault.address}`)


//     // send DAI to user 1
//     var amount = 5_000

//     const owner_before_balance = await dai.balanceOf(owner.address);
//     const user_before_balance = await dai.balanceOf(addr1.address);
//     console.log(`
//     Owner balance before transfer: ${owner_before_balance}
//     User balance before transfer: ${user_before_balance}
//     `)

//     // caller is owner.address
//     const tx1 = await dai.transfer(addr1.address, amount);


//     const owner_after_balance = await dai.balanceOf(owner.address);
//     const user_after_balance = await dai.balanceOf(addr1.address);
//     console.log(`
//     \n
//     . . . . . . . . . . . . . . . . . . . . . . . . . . .
//     Owner balance after transfer: ${owner_after_balance}
//     User balance after transfer: ${user_after_balance}
//     `)

//   })
// })



describe("User depositing in Vault and minting FARM token", function() {

  it("Should deposit DAI and mint FARM ", async () => {

    const [owner, addr1] = await ethers.getSigners();

    // Deploying DAI token first
    DAI = await hre.ethers.getContractFactory("DAI");
    dai = await DAI.deploy();
    await dai.deployed();
    console.log("Dai deployed to:", dai.address);

    // Depoying vault and instantiating DAI
    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(dai.address);
    await vault.deployed();
    console.log(`Vault deployed to: ${vault.address}`)

    // send DAI to user 1
    var amount = 5_000

    // caller is owner.address
    const tx1 = await dai.transfer(addr1.address, amount);

    
    const owner_after_balance = await dai.balanceOf(owner.address);
    const user_after_balance = await dai.balanceOf(addr1.address);
    console.log(`
    \n
    . . . . . . . . . . . . . . . . . . . . . . . . . . .
    Owner balance after transfer: ${owner_after_balance}
    User balance after transfer: ${user_after_balance}
    `)


    // connect.(addr1) to sign transactions as 'real' user.
    // approve DAI to allow vault spend 2_000 DAI.  
    const tx2 = await dai.connect(addr1).approve(vault.address, 2_000);
    console.log(`address addr1: ${addr1} approved DAI spending.`);

    const tx3 = await vault.connect(addr1).deposit(2_000);
    console.log(`addr1 deposited 2_000 in vault`);

    const dai_balance = await dai.balanceOf(addr1.address);
    const farm_balance = await vault.balanceOf(addr1.address);
    console.log(`
    addr1 DAI balance: ${dai_balance}
    addr1 FARM token balance: ${farm_balance}
    \n
    `)

    const tx4 = await vault.totalSupply();
    console.log(`Vault total supply: ${tx4.toString()}`);

  })


})