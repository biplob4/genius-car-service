import React from 'react';
import { Spinner } from 'react-bootstrap';

const Lodding = () => {
    return (
        <div style={{height:"400px"}} className="align-items-center d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default Lodding;