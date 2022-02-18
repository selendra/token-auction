import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";

export async function Signer(isTrust) {
  let signer;
  if(isTrust) {
    const provider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed.binance.org"
      },
    });
  
    //  Enable session (triggers QR Code modal)
    await provider.enable();
    const web3Provider = new providers.Web3Provider(provider);
  
    signer = web3Provider.getSigner();
  } else {
    const provider = new providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
  
    signer = provider.getSigner(accounts[0]);
  }

  return signer;
}