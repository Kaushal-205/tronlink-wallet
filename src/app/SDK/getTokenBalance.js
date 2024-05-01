import { ethers } from "ethers";
import ERC20ABI from '@openzeppelin/contracts/build/contracts/ERC20.json';

export async function getTokenBalance({
  assetIn,
  signer,
}) {
  const isETHIn = true;
    console.log("ABI:", ERC20ABI);
  const tokenInContract = new ethers.Contract(assetIn.address, ERC20ABI.abi, signer);

  let inBalancePromise;
  if (isETHIn) {
    inBalancePromise = signer.getBalance();
  } else {
    inBalancePromise = tokenInContract.balanceOf(signer.address);
  }
  
  const inBalance = await inBalancePromise;

  console.log(`🔥 ${assetIn.name} balance: `, ethers.parseUnits(inBalance, assetIn.decimals));

  return inBalance;
}
