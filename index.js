const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");



const accountAddress = process.argv[2];
if (!accountAddress) {
  console.log("Please provide the account public key as a CLI parameter.");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const getWalletBalance = async (accountAddress) => {
try {
  const walletBalance = await connection.getBalance(new PublicKey(accountAddress));
  console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
} catch (err) {
  console.log(err);
}
};


const airDropSol = async () => {
  try {

      console.log("Airdropping some SOL to the account:", accountAddress);
      
      const fromAirDropSignature = await connection.requestAirdrop(
          new PublicKey(accountAddress),
          2 * LAMPORTS_PER_SOL
      );
      
      await connection.confirmTransaction(fromAirDropSignature);
      
      console.log("Airdrop completed successfully.");
  } catch (err) {
      console.log("An error occurred during the airdrop:", err);
  }
};

const mainFunction =async() => {
try
{
await getWalletBalance(accountAddress);
await airDropSol(accountAddress);
await getWalletBalance(accountAddress);
}
catch (err)
{
console.log(err);
}};
mainFunction();

