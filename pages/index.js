import Image from 'next/image';
import { ethers } from 'ethers';
import { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, message, Row, Spin } from 'antd';
import { Context } from '@/context/contex';
import { Contract } from '@/utils/useContract';
import { Allowance } from '@/utils/getAllowance';
import { isvalidSubstrateAddress } from '@/utils/checkAddress';
import { Signer } from '@/utils/getSigner';
import styles from '@/styles/Home.module.css';
import usdt from '@/public/static/usdt.png';
import down from '@/public/static/down.png';

export default function Home() {
  const { isTrust } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [allowance, setAllowance] = useState('');

  async function approve() {
    try {
      const contractAddress = '0x9DCEC41e07fCD919a65e2a7F95B0D68fF07AdA30';
      let abi = [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ];

      setLoading(true);
      const signer = await Signer(isTrust);
      const contract = new ethers.Contract('0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', abi, signer);
      const data = await contract.approve(
        contractAddress,
        ethers.utils.parseUnits(Math.pow(10, 18).toString(), 18)
      );
      await data.wait();
      setAllowance(data.hash);
      setLoading(false);
      message.success('Approve completed!');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  
  async function handleOrder() {
    try {
      if(!amount || !address) return message.error('Please fill the form');
      if(!isvalidSubstrateAddress(address)) return message.error('selendra address is not valid!');
      setLoading(true);
      const contract = await Contract(isTrust); 
      
      const data = await contract.order(
        address,
        ethers.utils.parseUnits(amount, 18)
      );
      await data.wait();
      setLoading(false);
      message.success('Transaction completed!');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function estimateSEL(amount) {
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
    return (amount / 0.03).toFixed(2);
  }

  useEffect(() => {
    async function checkAllowance() {
      try {
        const tokenAddress = '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd';
        const allowance = await Allowance(isTrust, tokenAddress);
        setAllowance(Number(allowance._hex));
      } catch (error) {
        console.log(error);
      }
    }
    checkAllowance();
  },[isTrust, allowance])

  return (
    <div className='container'>
      <div className={styles.card}>
        <h1 className={styles.title}>Selendra Native Token Sale</h1>
        <Form layout='vertical'>
        <Form.Item className={styles.inputContainer} label='Selendra Address'>
            <Input className={styles.input} placeholder='' value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>
          <Form.Item className={styles.inputContainer} label='Amount'>
            <Row align='middle' justify='space-between'>
              <Input className={styles.inputAmount} placeholder='' value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Row>
                <Image src={usdt} width={22} height={22} alt='' /><span style={{color: '#85A1AD', marginLeft: '8px'}}>USDT</span>
              </Row>
            </Row>
          </Form.Item>
          {amount &&
            <>
              <center style={{marginBottom: '20px'}}>
                <Image src={down} width={22} height={22} alt='' />
              </center>
              <Spin spinning={spinning} delay={500}>
                <Form.Item className={styles.inputContainer} label='To (estimated)'>
                  <Input className={styles.input} value={estimateSEL(amount)} readOnly placeholder='' />
                </Form.Item>
              </Spin>
            </>
          }
          <Form.Item style={{margin: '0'}}>
            {allowance ? 
              <Button className={styles.btn} htmlType='submit' loading={loading} onClick={handleOrder}>Contribute</Button> :
              <Button className={styles.btn} htmlType='submit' loading={loading} onClick={approve}>Approve USDT</Button>
            }
          </Form.Item>
        </Form>            
      </div>
      <div className={styles.info}>
        <h2>How it works?</h2>
        <p>
          A simple method for participation to participate in token sale. Please follow the steps below: <br />
          1. Connect to Metamask or Trust Wallet. <br />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          2. Change network to BSC, if don't have BSC yet: 
          <a href='https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain' target='_blank' rel="noreferrer"> Metamask</a>,
          <a href='https://academy.binance.com/en/articles/connecting-trust-wallet-to-binance-smart-chain-bsc' target='_blank' rel="noreferrer"> Trust wallet</a>. <br />
          3. Make sure you have fund available at least $10 worth of USDT stable coins. <br />
          4. Enter the contribution amount. <br />
          5. Press Contribute. 
        </p>
      </div>
    </div>
  )
}
