import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"



import Switch from 'react-switch';

function CategoriesModal({ showModal, handleClose }) {
  const [status, setStatus] = useState(false);

  const handleStatusChange = (checked) => {
    setStatus(checked);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
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
          onSubmit={(values) => {
            console.log(values, "Values")
           
            handleClose();
          }}
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

              <Form.Group controlId="formStatus" className="mt-3 d-flex align-items-center">
                <Form.Label className="me-3">Status</Form.Label>
                <Switch
                  checked={values.status}
                  onChange={(checked) => setFieldValue('status', checked)}
                  onColor="#0d6efd"
                />
              </Form.Group>

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
