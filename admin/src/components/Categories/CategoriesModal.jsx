import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import {useDispatch,useSelector} from "react-redux"
import { addCategory } from './category.action';



import Switch from 'react-switch';

function CategoriesModal({ showModal, setShowModal }) {
  const  dispatch = useDispatch()

  const handleSubmit = (values) => {
    const formdata = new FormData()
    Object.keys(values).forEach((key)=> {
      formdata.append(key, values[key])
    })
    dispatch(addCategory(formdata))
  }
 
  return (
    <Modal show={showModal} onHide={()=>setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: '',
            description: '',
            image: null,
            status: false,
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
              <Form.Group controlId="formStatus" className="mt-3 d-flex align-items-center">
                <Form.Label className="me-3">Status</Form.Label>
                <Switch
                  checked={values.status}
                  onChange={(checked) => setFieldValue('status', checked)}
                  onColor="#0d6efd"
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mt-3">
                <Form.Label>Image</Form.Label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    setFieldValue('image', event.currentTarget.files[0]);
                  }}
                />
              </Form.Group>
              <img src={values.image && URL.createObjectURL(values.image)}/>
              <Button variant="primary" type="submit" className="mt-4">
                Submit
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default CategoriesModal;
