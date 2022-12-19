import { Connection } from "@solana/web3.js";
import { analyze } from "./lib/utils";
import dotenv from "dotenv";

dotenv.config();

async function init() {
  const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
  const TX_SIGNATURE = process.env.TX_SIGNATURE;

  if (!RPC_ENDPOINT || !TX_SIGNATURE) {
    console.log("Please provide all required values");
  } else {
    try {
      const connection = new Connection(RPC_ENDPOINT);

      const parsedTx = await connection.getParsedTransaction(TX_SIGNATURE);

      const info = analyze(parsedTx);

      console.log(info);
    } catch (e) {
      console.log(e);
      console.log("An error occurred. Please check your RPC node URL!");
    }
  }
}

init();
