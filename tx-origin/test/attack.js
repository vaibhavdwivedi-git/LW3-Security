const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("tx.origin", function () {
  it("Attack.sol will be able to change the owner of Good.sol", async function () {
    const [_, addr1] = await ethers.getSigners();
    const Good = await ethers.getContractFactory("Good");
    const goodContract = await Good.connect(addr1).deploy();
    await goodContract.deployed();
    console.log("Good Contract's Address:", goodContract.address);

    const Attack = await ethers.getContractFactory("Attack");
    const attackContract = await Attack.deploy(goodContract.address);
    await attackContract.deployed();
    console.log("Attack Contract's Address", attackContract.address);

    let tx = await attackContract.connect(addr1).attack();
    await tx.wait();

    expect(await goodContract.owner()).to.equal(attackContract.address);
  });
});
