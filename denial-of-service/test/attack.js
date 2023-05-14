const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Denial of Service", function () {
  it("After being declared the winner, Attack.sol should not allow anyone else to become the winner", async function () {
    const Good = await ethers.getContractFactory("Good");
    const goodContract = await Good.deploy();
    await goodContract.deployed();
    console.log("Good Contract's Address:", goodContract.address);

    const Attack = await ethers.getContractFactory("Attack");
    const attackContract = await Attack.deploy(goodContract.address);
    await attackContract.deployed();
    console.log("Attack Contract's Address", attackContract.address);

    const [_, addr1, addr2] = await ethers.getSigners();

    let tx = await goodContract.connect(addr1).setCurrentAuctionPrice({
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    tx = await attackContract.attack({
      value: ethers.utils.parseEther("3"),
    });
    await tx.wait();

    tx = await goodContract.connect(addr2).setCurrentAuctionPrice({
      value: ethers.utils.parseEther("4"),
    });
    await tx.wait();

    expect(await goodContract.currentWinner()).to.equal(attackContract.address);
  });
});
