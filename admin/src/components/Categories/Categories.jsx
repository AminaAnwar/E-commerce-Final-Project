import React, {useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import CategoriesModal from "./CategoriesModal"


function Categories() {

  const [type,setType] = useState(1)
  const [showModal,setShowModal] = useState(false)


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Categories</h3>
        <Button variant="primary" onClick={()=>{setType(1);setShowModal(true)}}>Add Category</Button>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Category 1</td>
            <td>Description of Category 1</td>
            <td>
              <Button variant="warning" size="sm">Edit</Button>{' '}
              <Button variant="danger" size="sm">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>

        <CategoriesModal type={type} showModal={showModal} setShowModal={setShowModal}/>


    </div>




  );
}

export default Categories;
