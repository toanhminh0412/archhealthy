import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './HomePage.css';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';


export function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <Carousel className='slide-header'>
                <Carousel.Item className='carousel-slide'>
                    <img
                        className="d-block w-100 h-100"
                        src="../images/slide-1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className='slide-caption'>
                        <h1>Eat Healthy</h1>
                        <p>Track your intake calories, fat, carb and protein. Perfect accuracy at the cheapest price</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className='carousel-slide'>
                    <img
                        className="d-block w-100"
                        src="../images/slide-2.jpg"
                        alt="Second slide"
                    />
                    
                    <Carousel.Caption className='slide-caption'>
                        <h1>Daily exercies</h1>
                        <p>Provide you with top brand equipment to help you have the best experience exercising</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className='carousel-slide'>
                    <img
                        className="d-block w-100"
                        src="../images/slide-3.jpg"
                        alt="Third slide"
                    />                
                    <Carousel.Caption className='slide-caption'>
                        <h1>Provide you a healthy lifestyle</h1>
                        <p>Track everything you need for a healthy lifestyle, including heart rate, amount of quality sleep, etc</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
            {loading ? <Loader/>
                : error ? <Message error={error}/>
                    : 
                    <Row>
                    {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                    ))}
                    </Row>   
            }

            
       </div>
    )
}