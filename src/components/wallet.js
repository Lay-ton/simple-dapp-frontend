import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './wallet.scss'

function Wallet(props) {
    return (
        <Container>
            <section className="wallet-item wallet-account">
                    <Container className="wallet-item__header" fluid>
                        Account: {props.account}
                    </Container>
                    <Container className="wallet-item__body" fluid>
                        <Container className="wallet-item__coin hasDivider">
                            <Image className="coin-icon" src="/1200px-Ethereum-icon-purple.svg.png" />
                            ETH: {props.balance["ETH"]}
                        </Container>
                        <Container className="wallet-item__coin">
                            <Image className="coin-icon" src="/compound-ether-ceth-logo.png" />
                            cETH: {props.balance["cETH"]}
                        </Container>
                    </Container>
            </section>
        </Container>
    );
}

export default Wallet;