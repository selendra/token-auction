import { useContext, useState } from "react";
import Image from "next/image";
import { Button, Col, Dropdown, Menu, Modal, Row } from "antd";
import { Context } from "@/context/contex";
import styles from '@/styles/Connect.module.css';
import metamask from '../public/static/metamask.webp';
import trustwallet from '../public/static/trustwallet.png';

function Connect() {
  const { connectMetamask, connectTrust, account, disconnect } = useContext(Context);
  const [modal, setModal] = useState(false);

  const menu = (
    <Menu className={styles.menu}>
      <Menu.Item key="0" className={styles.menuItem}>
        <span onClick={disconnect}>Disconnect</span>
      </Menu.Item>
    </Menu>
  );
  
  function strSlice(str) {
    return str.slice(0, 4) + '...' + str.slice(-3);
  };

  return ( 
    <div>
      { account ? 
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type='ghost' className={styles.btn}>
            {strSlice(account)}
          </Button>
        </Dropdown>
        : 
        <Button type='ghost' className={styles.btn} onClick={() => setModal(true)}>Connect</Button>
      }
      
      <Modal
        title='Choose wallet'
        visible={modal}
        footer=''
        onCancel={() => setModal(false)}
        className={styles.modal}
      >
        <Row span={12} justify="center">
          <Col onClick={() => connectMetamask()}>
            <Image className={styles.wallet} src={metamask} alt='' width='44' height='44' />
          </Col>
          <Col offset={4} onClick={() => connectTrust()}>
            <Image className={styles.wallet} src={trustwallet} alt='' width='44' height='44' />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Connect;