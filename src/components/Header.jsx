import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#">🪙 Crypto Full_Pricer</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
