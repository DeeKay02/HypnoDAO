import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x848d52fD02aD8272D0161d4bF9f5Ca7E3cDe5852");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "HypnoDAO Acccess Badge",
        description: "This NFT will give you access to HypnoDAO!",
        image: readFileSync("scripts/assets/hypnoDAO badge.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();