import {
  ParsedTransactionWithMeta,
  PublicKey,
  ParsedInstruction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const MAGIC_EDEN_ADDRESS = "MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8";
const MAGIC_EDEN2_ADDRESS = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K";

export interface MagicEdenSaleInfo {
  buyerWallet: string;
  sellerWallet: string;
  price: number;
  mint: string;
  blocktime: number;
}

/**
 * For Analyze Magic Eden V1 Transaction
 *
 *
 */

export const analyzeMagicEdenTx = (
  tx: ParsedTransactionWithMeta
): MagicEdenSaleInfo | null => {
  const instructions = tx.meta?.innerInstructions; // sol transfer txs
  const postTokenBalances = tx.meta?.postTokenBalances; // for nft balance
  const blocktime = tx.blockTime; // blocktime

  if (!instructions || !postTokenBalances || !blocktime) return null;

  const solTxs = instructions[0].instructions.slice(
    0,
    -1
  ) as ParsedInstruction[]; // except the last set authority tx

  let price = 0;
  solTxs.forEach((tx) => (price += tx.parsed.info.lamports)); // sum up all sol transfer amount
  price /= LAMPORTS_PER_SOL;

  const sellerWallet = solTxs.slice(-1)[0].parsed.info.destination; // the last sol tx for payment

  const buyerWallet = tx?.transaction.message.accountKeys[0].pubkey.toBase58(); // the first account as signer is buyer

  const mint = postTokenBalances[0].mint; // nft token change

  return {
    buyerWallet,
    sellerWallet,
    price,
    mint,
    blocktime,
  };
};

/**
 * For Analyze Magic Eden V2 Transaction
 *
 *
 */

export const analyzeMagicEden2Tx = (
  tx: ParsedTransactionWithMeta
): MagicEdenSaleInfo | null => {
  const instructions = tx.meta?.innerInstructions;

  const blocktime = tx.blockTime;
  if (!instructions || !blocktime) return null;

  const toMeTx = instructions[0].instructions[0] as ParsedInstruction; // from buyer to ME wallet tx

  const price = toMeTx.parsed.info.lamports / LAMPORTS_PER_SOL; // sol transfer amount
  const buyerWallet = toMeTx.parsed.info.source; // the source is buyer

  // the last instruction of third tx as close of seller ATA
  const seller_tx = instructions[2].instructions.slice(
    -1
  )[0] as ParsedInstruction;

  const sellerWallet = seller_tx.parsed.info.destination; // close the seller's ATA
  const mint = (instructions[2].instructions[6] as ParsedInstruction).parsed
    .info.mint;

  return {
    buyerWallet,
    sellerWallet,
    price,
    mint,
    blocktime,
  };
};

export const analyze = (
  tx: ParsedTransactionWithMeta | null
): MagicEdenSaleInfo | null => {
  if (!tx) return null;

  // in case of ME V1
  if (
    tx.transaction.message.instructions[0].programId.toBase58() ==
    MAGIC_EDEN_ADDRESS
  )
    return analyzeMagicEdenTx(tx);
  // in case of ME V2
  else if (
    tx.transaction.message.instructions[0].programId.toBase58() ==
    MAGIC_EDEN2_ADDRESS
  )
    return analyzeMagicEden2Tx(tx);
  // else null
  else return null;
};
