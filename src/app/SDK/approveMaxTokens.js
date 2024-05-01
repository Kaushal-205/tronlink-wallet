// import { isTokenApproved } from '@app/trade/utils';
import ERC20ABI from '@openzeppelin/contracts/build/contracts/ERC20.json';
import { ethers } from 'ethers';

export async function approveMaxToken({
  tokenAddress,
  amountIn,
  signer,
  spenderAddress
}) {
  if (tokenAddress === ethers.constants.AddressZero) {
    console.log('ℹ️', 'Gas asset does not need approval');
    return;
  }

  const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI.abi, signer);

//   const isApproved = await isTokenApproved({
//     tokenContract,
//     amount: amountIn,
//     spender: spenderAddress,
//     owner: signer.address
//   });

//   if (!isApproved) {
    console.log('ℹ️', 'Approving token');
    const approvalTx = await tokenContract.approve(spenderAddress, ethers.MaxUint256);
    await approvalTx.wait();
//   }
}
