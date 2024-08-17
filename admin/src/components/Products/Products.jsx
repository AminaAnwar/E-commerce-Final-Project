import React, {useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import ProductsModal from "./ProductsModal"


function Products() {

  const [type,setType] = useState(1)
  const [showModal,setShowModal] = useState(false)


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>
        <Button variant="primary" onClick={()=>{setType(1);setShowModal(true)}}>Add Product</Button>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Product 1</td>
            <td>Description of Product 1</td>
            <td>
              <Button variant="warning" size="sm">Edit</Button>{' '}
              <Button variant="danger" size="sm">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
        <ProductsModal type={type} showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
}

export default Products;
