import React, { useState, useEffect } from 'react';
import './App.scss';
import cETH from './abis/cETH.json';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import {
  Container,
  Col,
  Row,
  Button
} from 'react-bootstrap';

import Sidebar from './components/sidebar';
import Wallet from './components/wallet';
import Navigation from './components/nav';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState({"ETH": 0, "cETH" : 0});
  const [ctoken, setCToken] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions : {} // required
  }))

  async function connect() {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      let ethBalance = await web3.eth.getBalance(accounts[0])
      ethBalance = web3.utils.fromWei(ethBalance, 'ether')
      
      // Set the state
      setAccount(accounts[0]);
      setBalance({...balance, "ETH": parseFloat(ethBalance)});
      setWeb3(web3);
      
      try {
        // Load Compounds cEth contract to obtain balance of cEth in users wallet
        const ctoken = new web3.eth.Contract(cETH, '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5');
        setCToken(ctoken);
      } catch (e) {
        console.log(e);
        console.log('Contracts not deployed to the network');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function disconnect() {
    // disconnect isn't a true disconnect. It's more of a state reset 
    if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
      await web3.currentProvider.disconnect();
    }
    await web3Modal.clearCachedProvider();
    setWeb3(undefined);
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  return (
    <Container style={{height: "100%"}} fluid>
      <Container as={Row} className="dashboard-main" fluid noGutters>
          <Container as={Col} lg={2} fluid>
              <Sidebar/>
          </Container>
          <Container as={Col} lg={10} className="dashboard-body" fluid>
              <Navigation web3={web3} connect={connect} disconnect={disconnect}/>
              { web3 && account ? (
              <Wallet account={account} balance={balance}/>
              ) : (
              <Container>
                <section className="dashboard-item">
                    <Container className="dashboard-item__header" fluid>
                        Welcome
                    </Container>
                    <Container className="dashboard-item__body" fluid>
                        <Container className="dashboard-item__prompt">
                          Connect to MetaMask to view account details
                        </Container>
                        <Button variant="info" onClick={() => connect()}>
                          Connect
                        </Button>
                    </Container>
                </section>
              </Container>
              )}
          </Container>
      </Container>
    </Container>
  );
}

export default App;
