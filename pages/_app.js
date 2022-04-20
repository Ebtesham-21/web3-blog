/* pages/_app.js */
import '../styles/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import {css} from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import {ownerAddress} from '../config'
import 'easymde/dist/easymde.min.css'


function MyApp({Component, pageProps}) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal(){
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions:{
        walletConnect:{
          package: WalletConnectProvider,
          options:{
            infuraId: "your-infura-id"
          },
        },

      },
    })
    return web3Modal
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  
}