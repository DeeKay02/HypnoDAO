import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x848d52fD02aD8272D0161d4bF9f5Ca7E3cDe5852");

(async () => {
  try {
    // We define our claim conditions, this is an array of objects because
    // we can have multiple phases starting at different times if we want to
    const claimConditions = [{
      // When people are gonna be able to start claiming the NFTs (now)
      startTime: new Date(),
      // The maximum number of NFTs that can be claimed.
      maxQuantity: 50_000,
      // The price of our NFT (small price so that only real people with interest wwill join)
      price: 0.01,
      // The amount of NFTs people can claim in one transaction.
      quantityLimitPerTransaction: 1,
      // We set the wait between transactions to MaxUint256, which means
      // people are only allowed to claim once.
      waitInSeconds: MaxUint256,
    }]

    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();