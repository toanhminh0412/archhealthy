import React from 'react';
import { Navbar, Nav, Container, Col, Row, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.css';


export default function Header() {
    return (
        <header>
            <Navbar className='py-3' bg="success" variant="dark" expand="sm" sticky="top">
                <Container className='ms-10'>
                    <Col sm={3}>
                        <Link to='/' style={{textDecoration: "none"}}>   
                            <Navbar.Brand className='nav-brand'>ArchHealthy</Navbar.Brand>
                        </Link> 
                    </Col>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Col sm={9}>
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='nav-subsections'>
                            <Col className="nav-option" xs={2}>
                                <Nav.Link  href="#home"><span>Best Offers</span></Nav.Link>
                            </Col>
                            <Col className="nav-option" xs={2}>
                                <Nav.Link href="#link"><span>Your orders</span></Nav.Link>
                            </Col>
                            <Col className="nav-option" xs={2}>
                                <Nav.Link href="/cart"><span>Cart</span></Nav.Link>
                            </Col>
                            <Col className="nav-option" xs={6}>
                                <Nav.Link href="/login"><span>Login</span></Nav.Link>
                            </Col>
                        </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Container>
            </Navbar>
        </header>
    )
}
