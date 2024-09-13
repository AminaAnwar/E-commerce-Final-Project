import React, { useEffect } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import {login} from "./login.action"
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { ENV } from '../../config/config';
import { setErrors } from '../../redux/Shared/error.action';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const initialValues = {
  email: '',
  password: '',
};


const Login = () => {

  const  dispatch = useDispatch()
  const  navigate = useNavigate()
  const {loginData} = useSelector(state => state.auth)
  const {error} = useSelector(state => state.error)


  useEffect(()=> {
    if(loginData?.data) {
      ENV.storeAdminData(loginData.data)
      navigate("/")
    }
  }, [loginData])

    useEffect(()=> {
      if(error) {
        ENV.showAlert("Oops",error, "warning", false, "OK"  )
        dispatch(setErrors(null))
      }
    }, [error])


  const onSubmit = (values, {setSubmitting}) => {
    dispatch(login(values))
    .finally(()=> {
      setSubmitting(false)
    })
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({isSubmitting}) => (
            <FormikForm className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <Button variant="primary" type="submit" className="w-full" disabled={isSubmitting}>
                  Login
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
