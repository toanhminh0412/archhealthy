import React from 'react';
import { Alert } from 'react-bootstrap';

function Message(props) {
    return (
        <div>
            <Alert variant='danger'>{props.error}</Alert>
        </div>
    )
}

export default Message
