import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    Button
} from 'react-bootstrap'
import "./nav.scss";

function Navigation(props) {
    const handleConnect = () => {
        props.connect()
    }

    const handleDisconnect = () => {
        props.disconnect()
    }

    return (
        <Container className="site-nav" fluid>
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container className="site-nav__header" fluid>
                    {props.web3 !== undefined ? (
                        <Nav>
                            <Button variant="info" onClick={() => handleDisconnect()}>
                                Disconnect
                            </Button>
                        </Nav>
                    ) : (
                        <Nav>
                            <Button variant="info" onClick={() => handleConnect()}>
                                Connect
                            </Button>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </Container>
    );
}

export default Navigation;