"use client";
const { ChainId, Symbiosis, Token, TokenAmount } = require("symbiosis-js-sdk");
const { ethers } = require('ethers');
const { getTokenBalance } = require("./getTokenBalance");
// const { useWallet } = require("@tronweb3/tronwallet-adapter-react-hooks");

const symbiosis = new Symbiosis('testnet', 'sdk-symbio-swap');

// UTILS

function getPercentAmount(amountIn, percent) {
  return Math.floor(amountIn * (percent / 100));
}

export async function swap(
  { assetIn, assetOut, chainIn, chainOut, address }) {
  // console.log("useWallet", useWallet);
  
  const swapChainIn = chainIn;
  const swapChainOut = chainOut || chainIn;
  const wallet = tronWeb.trx.sign;
  const isETHIn = assetIn.isNative;
  const isETHOut = assetOut.isNative;
  console.log("Address: ", address);
  console.log("wallet sign ", wallet);
  // const assetBalance = await getTokenBalance({
  //   assetIn,
  //   signer: wallet,
  // });
  // console.log("Asset balance: ", assetBalance);
  // // swap 80% of the balance if it is gas asset
  // const amountIn = isETHIn ? getPercentAmount(assetBalance, 90) : assetBalance;

  // if (amountIn.isZero()) {
  //   throw Error(
  //     ` Not enough balance - ${parseUnits(assetBalance, assetIn.decimals)} ${assetIn.name} `
  //   );
  // }
  const amountIn = 10;

  const tokenIn = new Token({
    chainId: swapChainIn,
    address: isETHIn ? '' : assetIn.address,
    isNative: isETHIn,
    symbol: assetIn.symbol,
    decimals: assetIn.decimals,
  });
  const tokenAmountIn = new TokenAmount(tokenIn, amountIn.toString());
  console.log('🔥', tokenIn);
  const tokenOut = new Token({
    chainId: swapChainOut,
    isNative: isETHOut,
    address: isETHOut ? '' : assetOut.address,
    symbol: assetOut.symbol,
    decimals: assetOut.decimals,
  });
  console.log('🔥', tokenOut);

  const swapping = symbiosis.bestPoolSwapping();
  console.log("swapping...", swapping);
  console.log("assetIn: ", tokenIn);
  console.log("assetOut: ", tokenOut);
  console.log("token amount object:", tokenAmountIn);
  // Calculates fee for swapping between chains and transactionRequest
  console.log('Calculating swap...');
  try {
    const { transactionRequest, fee, tokenAmountOut, route, priceImpact, approveTo } =
      await swapping.exactIn({
        tokenAmountIn, // TokenAmount object
        tokenOut, // Token object
        from: address, // from account address
        to: address, // to account address
        revertableAddress: address, // account who can revert stucked transaction
        slippage: 100, // 1% slippage
        deadline: Date.now() + 20 * 60 // 20 minutes deadline
      });
    // console.log("tokenAmountIn: ", tokenAmountIn);
    console.log("TokenamountIn",{
      tokenAmountIn: tokenAmountIn.toSignificant(),
      fee: fee.toSignificant(),
      tokenAmountOut: tokenAmountOut.toSignificant(),
      // route: route.map((i: any) => i.symbol).join(' -> '),
      priceImpact: priceImpact.toSignificant()
    });

    if (!isETHIn) {
      // swap tokens for eth
      await approveMaxToken({
        tokenAddress: assetIn.address,
        amountIn,
        signer: wallet,
        spenderAddress: approveTo
      });
    }

    console.log({
      tokenAmountIn: tokenAmountIn.toSignificant(),
      fee: fee.toSignificant(),
      tokenAmountOut: tokenAmountOut.toSignificant(),
      // route: route.map((i: any) => i.symbol).join(' -> '),
      priceImpact: priceImpact.toSignificant()
    });

    // Send transaction to chain
    const transactionResponse = await wallet.sendTransaction(transactionRequest);
    console.log('Transaction sent', transactionResponse.hash);

    // Wait for transaction to be mined
    const receipt = await transactionResponse.wait(1);
    console.log('Transaction mined', receipt.transactionHash);

    // Wait for transaction to be completed on recipient chain
    const log = await swapping.waitForComplete(receipt);
    console.log('Cross-chain swap completed', log.transactionHash);
  } catch (e) {
    console.error("Error in swapping", e);
  }
}
