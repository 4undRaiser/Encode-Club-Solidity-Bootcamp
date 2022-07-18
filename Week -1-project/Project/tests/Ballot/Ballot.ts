import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function giveRightToVote(ballotContract: Ballot, voterAddress: any) {
  const tx = await ballotContract.giveRightToVote(voterAddress);
  await tx.wait();
}

describe("Ballot", function () {
  let ballotContract: Ballot;
  let accounts: any[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount.toNumber()).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async function () {
      const chairperson = await ballotContract.chairperson();
      expect(chairperson).to.eq(accounts[0].address);
    });

    it("sets the voting weight for the chairperson as 1", async function () {
      const chairpersonVoter = await ballotContract.voters(accounts[0].address);
      expect(chairpersonVoter.weight.toNumber()).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      const voterAddress = accounts[1].address;
      const tx = await ballotContract.giveRightToVote(voterAddress);
      await tx.wait();
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.weight.toNumber()).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("The voter already voted.");
    });

    it("can not give right to vote for someone that already has voting rights", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await expect(
        giveRightToVote(ballotContract, voterAddress)
      ).to.be.revertedWith("");
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    // TODO
    it("Should set the value of voted in the voters struct to true and vote value to the index of the voted proposal", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const voter = await ballotContract.voters(voterAddress);
      expect(voter.voted).to.eq(true);
      expect(voter.vote.toNumber()).to.eq(0);
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    // TODO
    it("Should set the value of voted and the delegate in the Voter struct of the voterAdress to true and delegatevoterAddress respectively. The weight of the delegatevoterAddress should be 2", async function () {
      const voterAddress = accounts[1].address;
      const delegatevoterAddress = accounts[2].address;
      await giveRightToVote(ballotContract, voterAddress);
      await giveRightToVote(ballotContract, delegatevoterAddress);
      await ballotContract.connect(accounts[1]).delegate(delegatevoterAddress);
      const voter = await ballotContract.voters(voterAddress);
      const delegate = await ballotContract.voters(delegatevoterAddress);
      expect(voter.voted).to.be.true;
      expect(voter.delegate).to.eq(delegatevoterAddress);
      expect(delegate.weight.toNumber()).to.eq(2);
    });
  });

  describe("when an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
    it("Should prevent the attacker from calling the function with a reverted message ", async function () {
      const attackerAddress = accounts[3].address;
      const voterAddress = accounts[4].address;
      await expect(ballotContract.connect(accounts[3]).giveRightToVote(voterAddress)
      ).to.be.revertedWith("Only chairperson can give right to vote.");

    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    // TODO
    it("Should revert the transaction with a message", async function () {
      const attackerAddress = accounts[3].address;
      await expect(ballotContract.connect(accounts[3]).vote(1)
      ).to.be.revertedWith("Has no right to vote");
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
    it("Should revert the transaction with a message", async function () {
      const attackerAddress = accounts[3].address;
      await expect(ballotContract.connect(accounts[3]).delegate(attackerAddress)
      ).to.be.revertedWith("Self-delegation is disallowed.");
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
    it("Should return a value of zero", async function () {
      const interactor = accounts[1].address;
      await expect((await ballotContract.connect(accounts[1]).winningProposal()).toNumber()
      ).to.eq(0);
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
    it("Should return the name of the winning proposal", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const winner = await ballotContract.winningProposal();
      const proposal = await ballotContract.proposals(winner);
      expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
      PROPOSALS[0]);
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
    it("Should return the name of the first proposal", async function () {
      const winner = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winner)).to.eq(
        PROPOSALS[0]);
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      const voterAddress = accounts[1].address;
      await giveRightToVote(ballotContract, voterAddress);
      await ballotContract.connect(accounts[1]).vote(0);
      const winner = await ballotContract.winnerName();
      expect(ethers.utils.parseBytes32String(winner)).to.eq(
        PROPOSALS[0]);
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
    it("Should return a winner name that is equal to the name of the winning proposal.", async function () {
      const votes = 6;
      for (let index = 1; index < votes; index++) {
        await giveRightToVote(ballotContract, accounts[index].address);
        await ballotContract.connect(accounts[index]).vote(Math.floor(Math.random() * 3)); 
      }
      const winner = await (await ballotContract.connect(accounts[1]).winningProposal()).toNumber();
      const winningproposal = await ballotContract.proposals(winner);
      const winnername = await ballotContract.connect(accounts[2]).winnerName();
      expect(ethers.utils.parseBytes32String(winnername.toString())
      ).to.eq(ethers.utils.parseBytes32String(winningproposal.name));
      console.log(ethers.utils.parseBytes32String(winningproposal.name));
    });
  });
});
