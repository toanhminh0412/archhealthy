import React, {useState, useEffect} from 'react';
import { Container, Button, Row, Col, ListGroup, Image, Form } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import products from '../product';
import './CartPage.css';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeCartItem } from '../actions/cartActions';

export function CartPage({ match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch()

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems;
    console.log('cartItems:', cartItems)

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Container className='mt-5 product-display-container'>
            <Row>
                <Col>
                    <h1>Your Cart</h1>
                </Col>

                <Col style={{'textAlign': 'right'}} className='me-5'>
                    <Button variant='outline-success' href='/'>Home</Button>
                </Col>

                
            </Row>

            {cartItems.length === 0 ? (
            <Row>
                <Col xs={8}>
                    <Message error="Your cart is empty"></Message>
                </Col>
            </Row>) :
            (
                <Row className='mt-5'>
                <Col xs={7} className='ms-5'>
                    {cartItems.map(product => (
                    <Row className='mt-5' key={product.product}>
                        <Col xs={3}>
                            <Image src={`http://127.0.0.1:8000${product.image}`} className='cart-product-img'></Image>
                        </Col>

                        <Col xs={7}>
                            <Row>
                                <h2>{product.name}</h2>
                            </Row>

                            <Row className='mt-3 cart-price-text'>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    ${product.price}
                                </Col>
                            </Row>

                            <Row className='mt-1'>
                                <p>{product.countInStock > 0 ? "In Stock": "Out of stock"}</p>
                            </Row>

                            <Row className='mt-1'>
                                <Col xs={4}>
                                    <Form.Control
                                        id="qty-field"
                                        as="select"
                                        placeholder="Quantity"
                                        value={product.qty}
                                        onChange={async (e)=>{await dispatch(addToCart(product.product, Number(e.target.value)))}}
                                    >
                                        {
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={2}>
                            <DeleteIcon 
                                color='action' 
                                fontSize='large' 
                                className='delete-icon'
                                onClick={() => {dispatch(removeCartItem(product.product))}}
                                ></DeleteIcon>
                        </Col>

                    </Row>
                    ))}
                </Col>

                <Col xs={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <h1>Subtotal</h1>
                            </Row>

                            <Row>
                                <h2>${cartItems.reduce((priceSum, item) => priceSum + item.price * item.qty, 0)}</h2>
                            </Row>

                            <Row>
                                <p>Free shipping to V8N3R9, arrive on Thu Sep 21, 2021</p>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Button 
                                variant='dark' 
                                size='lg' 
                                className='w-100 h-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                >Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            )
            }

            
        
        </Container>
    )
}

/*
<Col xs={7} className='ms-5'>
                    {productsInCart.map(product => (
                        <Row className='mt-5'>
                            <Col xs={3}>
                                <Image src={`http://127.0.0.1:8000${product.image}`} className='cart-product-img'></Image>
                            </Col>

                            <Col xs={9}>
                                <Row>
                                    <h2>{product.name}</h2>
                                </Row>

                                <Row className='mt-3 cart-price-text'>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        ${product.price}
                                    </Col>
                                </Row>

                                <Row className='mt-1'>
                                    <p>{product.countInStock > 0 ? "In Stock": "Out of stock"}</p>
                                </Row>

                                <Row className='mt-1'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant='outline-dark'>
                                            Quantity
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>1</Dropdown.Item>
                                            <Dropdown.Item>2</Dropdown.Item>
                                            <Dropdown.Item>3</Dropdown.Item>
                                            <Dropdown.Item>4</Dropdown.Item>
                                            <Dropdown.Item>5</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Row>
                            </Col>

                    </Row>
                    ))}  
                </Col>
*/