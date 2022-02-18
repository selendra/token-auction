import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Col, Drawer, Row } from 'antd';
import Connect from './Connect';
import logo from '@/public/static/logo.png';
import menu from '@/public/static/menu.svg';
import styles from '@/styles/Header.module.css';

function Header() {
  const [drawer, setDrawer] = useState(false);
  const styling = {
    background: 'rgb(1,45,65)',
  }

  return ( 
    <header className='container'>
      <div className={styles.header}>
        <Row justify='space-between' align='middle' style={{height: '100%'}}>
          <Col span={6}>
            {/* <Link href='/' passHref> */}
              <Image src={logo} alt='' width={110} height={50} />
            {/* </Link> */}
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} xl={6}>
            <Row justify='center'>
              <Link href='/' passHref>
                <p className={styles.nav}>Home</p>
              </Link>
              <div style={{margin:'0 24px'}} />
              <Link href='/mysel' passHref>
                <p className={styles.nav}>My $SEL</p>
              </Link>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row justify='end'>
              <Connect />
            </Row>
          </Col>
          <Col xs={4} sm={4} md={0} lg={0} xl={0}>
            <Row justify='end'>
              <Image src={menu} alt='' width={30} height={30} onClick={() => setDrawer(true)}/>
            </Row>
          </Col>
        </Row>
        <Drawer className={styles.drawer} bodyStyle={styling} width={320} headerStyle={styling} closable={false} placement="right" onClose={() => setDrawer(!drawer)} visible={drawer}>
          <Image src={logo} alt='' width={110} height={50} />
          <div className={styles.navItem}>
            <Link href='/' passHref>
              <p className={styles.nav}>Home</p>
            </Link>
            <Link href='/mysel' passHref>
              <p className={styles.nav}>My $SEL</p>
            </Link>
          </div>
        </Drawer>
        <div className={styles.margicLine}/>
      </div>
    </header>
  );
}

export default Header;