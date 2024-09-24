import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import {useDispatch,useSelector} from "react-redux"
import  {addProduct} from "./product.action"



import Switch from 'react-switch';

function ProductsModal({ showModal, setShowModal }) {
  const  dispatch = useDispatch()

  const handleSubmit = (values) => {
    const formdata = new FormData()
    Object.keys(values).forEach((key)=> {
      if(key === "images") {
        values.images.forEach((image)=> {
            formdata.append('images', image)
        })
      } else {
        formdata.append(key, values[key])
      }
    })
    dispatch(addProduct(formdata))
  }

  return (
    <Modal show={showModal} onHide={()=>setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: 0,
            images: null,
            featured: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue,values }) => (
            <FormikForm>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Field
                  name="title"
                  className="form-control"
                  placeholder="Enter title"
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <CKEditor
                editor={ClassicEditor}
                data={values.description}
                onChange={(event, editor )=>setFieldValue('description', editor.getData())}
                />
              </Form.Group>
              <Form.Group controlId="formTitle">
                <Form.Label>Price</Form.Label>
                <Field
                  name="price"
                  type="number"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formStatus" className="mt-3 d-flex align-items-center">
                <Form.Label className="me-3">Featured</Form.Label>
                <Switch
                  checked={values.featured}
                  onChange={(checked) => setFieldValue('featured', checked)}
                  onColor="#0d6efd"
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mt-3">
                <Form.Label>Image</Form.Label>
                <input
                  multiple
                  type="file"
                  name="images"
                  className="form-control"
                  onChange={(event) => {
                   const files = Array.from(event.currentTarget.files)
                   const updatedFiles = values.images ? [...values.images, ...files] : files
                   setFieldValue("images", updatedFiles)
                  }}
                />
              </Form.Group>
              {Array.isArray(values.images) && values.images.map((img,indexToRemove) => {
                return (
                    <div className="relative inline-block">
                    <img src={URL.createObjectURL(img)} alt="preview" className="w-32 h-32 object-cover" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 mt-1 mr-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 focus:outline-none"
                      onClick={() => setFieldValue("images", values.images.filter((_,index) => index !== indexToRemove))} 
                    >
                      x
                    </button>
                  </div>
                  
                )
                })}
              <Button variant="primary" type="submit" className="mt-4">
                Submit
              </Button>
              {console.log('🧛‍♂️', values.images)}
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ProductsModal;
