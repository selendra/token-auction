import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/contex';
import styles from '../styles/MySel.module.css';
import abi from '../abis/abi.json';
import { Spin } from 'antd';
import Image from 'next/image';

function MySel() {
  const { account } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('');

  async function getBalance() {
    setLoading(true);
    const contractAddress = '0xb5f6d141a3d5045a217a840E7160BC107313ADa0';
    const provider = ethers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
  
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );

    const data = await contract.balanceOf(account);
    setBalance(ethers.utils.formatUnits(data._hex, 18));
    setLoading(false);
  }

  function getPrice(amount) {
    return (Number(amount) * 0.03).toFixed(2);
  }

  useEffect(() => {
    if(!account) return;
    getBalance();
  },[account]);

  return ( 
    <div className='container'>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={styles.portfolio}>
            <Image src='/static/sel-token.png' width={44} height={44} alt='' />
            <div style={{marginLeft: '8px'}}>
              <p>SEL</p>
              <p>$0.03</p>
            </div>
          </div>
          <Spin spinning={loading} />
          {!loading && 
            <div>
              <p>{Number(balance).toFixed(2)} SEL</p>
              <p>≈ ${getPrice(balance)} USD</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MySel;