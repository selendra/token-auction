import Head from 'next/head'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import { ContextProvider } from '../context/contex'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  if(process.browser) {
    const { ethereum } = window;
    if(ethereum) {
      ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  }

  return (
    <div>
      <Head>
        <title>Selendra Native Token Sale</title>
        <meta name="description" content="Selendra Native Token Sale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContextProvider>
        <Header />
        <div className='spacing' />
        <Component {...pageProps} />
      </ContextProvider>
    </div>
  )
}

export default MyApp
