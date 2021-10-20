import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Container, Row, Col, Image, Dropdown, ListGroup, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './ProductPage.css';
import { listProductDetails } from '../actions/productActions';
import axios from 'axios';


export function ProductPage({ match, history }) {
    const [qty, setQty] = useState(1);
    
    const pk = match.params.id;
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(pk))

    }, [dispatch, match]);

/*
    const addToCartHandler = () => {
        axios.post('http://127.0.0.1:8000/api/add_product_to_order/', {
            id: product._id,
            qty: qty
        }).then((response) => {
            console.log(response.data)
        });
    }
*/

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    
    return (
        <div className='mt-5 product-display-container'>

            <Button variant='outline-success' href='/'>Back</Button>

            {loading ? <Loader /> :
                error ? <Message error={error}></Message> 
                :
                <Row className='product-display'>
                <Col xs={4}>
                    <Image className='product-img' src={`http://127.0.0.1:8000${product.image}`} rounded/>
                </Col>

                <Col xs={4} className='product-info'>
                    <Row>
                        <h2>{product.name}</h2>
                    </Row>
                    
                    <Row>
                        <div className='my-3'>
                            {product.rating} from {product.numReviews} reviews
                        </div>
                    </Row>
                    
                    <Row>
                        <h1>${product.price}</h1>
                    </Row>
                    
                    <Row>
                        <p>{product.description}</p>
                    </Row>

                </Col>

                <Col xs={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <h1>Subtotal</h1>
                            </Row>

                            <Row className='qty-text mt-4'>
                                <Col xs={4}>
                                    Qty:
                                </Col>

                                <Col xs={8}>
                                    <Form.Control
                                        id="qty-field"
                                        as="select"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
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

                            <Row className='price-text mt-2'>
                                <Col xs={2}>
                                    Price: 
                                </Col>

                                <Col xs={10}>
                                    ${product.price}
                                </Col>

                            </Row>

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                variant='dark' 
                                size='lg' 
                                className='w-100'
                                disabled={product.countInStock === 0}
//                                 href='/cart'
                                onClick={addToCartHandler}
                                >Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>   
                </Col>

            </Row>
            }
            
            

           
        </div>
    )
}

/*
<Card>
                        <Card.Title class='subtotal-text'>Subtotal</Card.Title>
                        <Card.Body>
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
                        </Card.Body>

                        <Card.Body>
                            <Button variant='dark'>Add to Cart</Button>
                        </Card.Body>
                    </Card>
*/