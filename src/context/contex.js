import { createContext, useEffect, useState } from "react";
import cookie from 'cookiejs';
import { message } from "antd";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getCookie } from "cookies-next";
import { providers } from "ethers";

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [account, setAccount] = useState('');
  const [isTrust, setIsTrust] = useState(false || getCookie('wallet') === 'walletconnect');

  function disconnect() {
    cookie.set('wallet', '');
    setAccount('');
  }

  async function connectMetamask() {
    const { ethereum } = window;
    if(!ethereum) return message.error('Metamask not detected!');
    try {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0])
          setIsTrust(false);
          cookie.set('wallet', 'metamask');
        })
    } catch (error) {
      console.log(error);
    }
  }

  async function connectTrust() {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org"
        },
        qrcodeModalOptions: {
          mobileLinks: ["trust"]
        }
      })
      // enable session (triggers qr code modal)
      await provider.enable();

      const web3provider = new providers.Web3Provider(provider);
      const accounts = await web3provider.listAccounts();

      setAccount(accounts[0]);
      setIsTrust(true);
      cookie.set('wallet', 'walletconnect');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(isTrust) {
      connectTrust();
    } else {
      connectMetamask();
    }
  },[isTrust])

  return (
    <Context.Provider
      value={{
        account,
        isTrust,
        connectMetamask,
        connectTrust,
        disconnect
      }}
    >{children}</Context.Provider>
  )
}