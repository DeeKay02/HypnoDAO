import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0xc9b7534fF50961259aAD4aD2EEefC8d4E5673787");

// This is our ERC-20 contract.
const token = sdk.getToken("0xDE4d986836DA39e7278FD46B5E315E82952c361D");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent75 = Number(ownedAmount) / 100 * 75;

    // Transfer 75% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent75
    ); 

    console.log("✅ Successfully transferred " + percent75 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();