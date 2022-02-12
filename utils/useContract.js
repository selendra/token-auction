import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import abi from '../abis/abi.json';

export async function Contract(isTrust) {
  const contractAddress = '0x9DCEC41e07fCD919a65e2a7F95B0D68fF07AdA30';
  let signer;
  if(isTrust) {
    console.log('trust wallet');
    const provider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed.binance.org"
      },
    });
  
    await provider.enable();
  
    const web3Provider = new providers.Web3Provider(provider);
    signer = web3Provider.getSigner();
  } else {
    console.log('metamask wallet');
    const provider = new providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
  
    signer = provider.getSigner(accounts[0]);
  }

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  );

  return Contract;
}