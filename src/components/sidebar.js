import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import "./sidebar.scss";

function Sidebar(props) {

    return (
        <Container className="dashboard-navbar__wrapper" fluid>
            <Navbar bg="dark" variant="dark" expand="sm" className="flex-lg-column dashboard-navbar">
                <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-lg-column">
                    <Nav.Link href="#" eventKey="one">Products</Nav.Link>
                    <Nav.Link href="#" eventKey="two">Orders</Nav.Link>
                    <Nav.Link href="#" eventKey="three">Settings</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default Sidebar;