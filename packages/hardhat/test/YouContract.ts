const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YourContract", function () {
  let YourContract, yourContract, admin, addr1, addr2, addrs;

  beforeEach(async () => {
    YourContract = await ethers.getContractFactory("YourContract");
    [admin, addr1, addr2, ...addrs] = await ethers.getSigners();
    yourContract = await YourContract.deploy(admin.address);
  });

  // Helper function to expect custom errors
  function expectError(promise, expectedError) {
    return promise.then(
      () => {
        throw new Error("Expected error but none was thrown");
      },
      (error) => {
        if (error.message.includes("Transaction reverted with an unrecognized custom error")) {
          const reason = error.data.substring(138);
          expect(reason).to.equal(expectedError);
        } else {
          expect(error.message).to.equal(expectedError);
        }
      }
    );
  }

  describe("Deployment", function () {
    it("Should set the correct admin upon deployment", async function () {
      expect(await yourContract.hasRole(await yourContract.DEFAULT_ADMIN_ROLE(), admin.address)).to.equal(true);
    });
  });

  describe("Admin role modification", function () {
    it("Should correctly grant admin role", async function () {
      await yourContract.connect(admin).modifyAdminRole(addr1.address, true);
      expect(await yourContract.hasRole(await yourContract.DEFAULT_ADMIN_ROLE(), addr1.address)).to.equal(true);
    });

    it("Should correctly revoke admin role", async function () {
      await yourContract.connect(admin).modifyAdminRole(addr1.address, true);
      await yourContract.connect(admin).modifyAdminRole(addr1.address, false);
      expect(await yourContract.hasRole(await yourContract.DEFAULT_ADMIN_ROLE(), addr1.address)).to.equal(false);
    });
  });

  describe("Emergency mode", function () {
    it("Should correctly enable emergency mode", async function () {
      await yourContract.connect(admin).emergencyMode(true);
      expect(await yourContract.stopped()).to.equal(true);
    });

    it("Should correctly disable emergency mode", async function () {
      await yourContract.connect(admin).emergencyMode(true);
      await yourContract.connect(admin).emergencyMode(false);
      expect(await yourContract.stopped()).to.equal(false);
    });

      });

  describe("Add creator flow", function () {
    
    it("Should correctly add a creator", async function () {
      await yourContract.connect(admin).addCreatorFlow(addr1.address, 100);
      let creatorInfo = await yourContract.flowingCreators(addr1.address);
      expect(creatorInfo.cap).to.equal(100);
    });

      });

  describe("Update creator flow cap", function () {
    it("Should correctly update a creator flow cap", async function () {
      await yourContract.connect(admin).addCreatorFlow(addr1.address, 100);
      await yourContract.connect(admin).updateCreatorFlowCapCycle(addr1.address, 200);
      let creatorInfo = await yourContract.flowingCreators(addr1.address);
      expect(creatorInfo.cap).to.equal(200);
    });
  });

  describe("Remove creator flow", function () {
    it("Should correctly remove a creator", async function () {
      await yourContract.connect(admin).addCreatorFlow(addr1.address, 100);
      await yourContract.connect(admin).removeCreatorFlow(addr1.address);
      let creatorInfo = await yourContract.flowingCreators(addr1.address);
      expect(creatorInfo.cap).to.equal(0);
    });
  });
describe("Fund contract", function () {
  it("Should correctly receive funds", async function () {
    await yourContract.connect(addr1).fundContract({ value: 1000 });
    expect(await ethers.provider.getBalance(yourContract.address)).to.equal(1000);
  });
});

describe("Add batch of creators", function () {
  it("Should correctly add a batch of creators", async function () {
    await yourContract.connect(admin).addBatch([addr1.address, addr2.address], [100, 200]);
    
    let creatorInfo1 = await yourContract.flowingCreators(addr1.address);
    expect(creatorInfo1.cap).to.equal(100);
    
    let creatorInfo2 = await yourContract.flowingCreators(addr2.address);
    expect(creatorInfo2.cap).to.equal(200);
  });
});

describe("Flow withdraw", function () {
  it("Should correctly allow a creator to withdraw", async function () {
    await yourContract.connect(admin).addCreatorFlow(addr1.address, 100);
    await yourContract.connect(addr1).fundContract({ value: 1000 });

    // Fast forward 15 days
    await ethers.provider.send("evm_increaseTime", [15 * 24 * 3600]);
    await ethers.provider.send("evm_mine");

    const initialBalance = await ethers.provider.getBalance(addr1.address);
    const tx = await yourContract.connect(addr1).flowWithdraw(40, "Withdraw");
    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);

    const creatorInfo = await yourContract.flowingCreators(addr1.address);

    const finalBalance = await ethers.provider.getBalance(addr1.address);
    expect(finalBalance.add(gasUsed).sub(initialBalance)).to.equal(40);
  });
});describe("Drain agreement", function () {
  it("Should correctly drain remaining funds to the primary admin", async function () {
    await yourContract.connect(addr1).fundContract({ value: 1000 });

    const initialAdminBalance = await ethers.provider.getBalance(admin.address);
    const tx = await yourContract.connect(admin).drainAgreement();
    const txReceipt = await tx.wait();
    const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice);

    expect(await ethers.provider.getBalance(yourContract.address)).to.equal(0);

    const finalAdminBalance = await ethers.provider.getBalance(admin.address);
    expect(finalAdminBalance.add(gasUsed).sub(initialAdminBalance)).to.equal(1000);
  });
});  // More tests go here...
});
