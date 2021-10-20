import React from 'react';
import { Card } from 'react-bootstrap';
import './Product.css';
import { Link } from 'react-router-dom';

export default function Product({product}) {
    
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`} style={{textDecoration: "none"}}>
                <Card.Img className='item-img' src={`http://127.0.0.1:8000${product.image}`}></Card.Img>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`} style={{textDecoration: "none"}}>
                    <Card.Title as='div' style={{color: '#000'}}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className='my-3'>
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}