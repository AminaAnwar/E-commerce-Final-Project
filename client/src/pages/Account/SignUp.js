import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { signup } from "./userSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Yup validation schema
const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Enter your name"),
  email: Yup.string().email("Enter a valid email").required("Enter your email"),
  phoneNumber: Yup.string().required("Enter your phoneNumber number"),
  password: Yup.string()
    .min(10, "Password must be at least 10 characters")
    .required("Create a password"),
  address: Yup.string().required("Enter your address"),
  city: Yup.string().required("Enter your city name"),
  country: Yup.string().required("Enter your country"),
  zipCode: Yup.string().required("Enter your zipCode code"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData} = useSelector(state => state.user)

  useEffect(()=> {
    if(userData?.status) {
      navigate("/signin")
    }
    else {
      alert("Something went wrong!")
    }
  }, [userData])

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            address: "",
            city: "",
            country: "",
            zipCode: "",
            termsAccepted: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(signup(values))
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                  Create your account
                </h1>

                <div className="flex flex-col gap-3">
                  {/* Full Name */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Full Name
                    </p>
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="eg. John Doe"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Work Email
                    </p>
                    <Field
                      name="email"
                      type="email"
                      placeholder="john@workemail.com"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>

                  {/* phoneNumber Number */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      phoneNumber Number
                    </p>
                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="008801234567891"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Password
                    </p>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Create password"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Address
                    </p>
                    <Field
                      name="address"
                      type="text"
                      placeholder="road-001, house-115, example area"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      City
                    </p>
                    <Field
                      name="city"
                      type="text"
                      placeholder="Your city"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Country
                    </p>
                    <Field
                      name="country"
                      type="text"
                      placeholder="Your country"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      zipCode/Postal code
                    </p>
                    <Field
                      name="zipCode"
                      type="text"
                      placeholder="Your zipCode code"
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="p"
                      className="text-sm text-red-500 font-titleFont font-semibold px-4"
                    />
                  </div>
                  <div className="flex items-start mdl:items-center gap-2">
                    <Field
                      name="termsAccepted"
                      type="checkbox"
                      className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    />
                    <p className="text-sm text-primeColor">
                      I agree to the OREBI{" "}
                      <span className="text-blue-500">Terms of Service</span>
                    </p>
                  </div>
                  <ErrorMessage
                    name="termsAccepted"
                    component="p"
                    className="text-sm text-red-500 font-titleFont font-semibold px-4"
                  />

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 text-white text-base font-titleFont tracking-wider bg-primeColor hover:bg-hoverColor duration-300 rounded-md"
                    >
                      {isSubmitting ? "Submitting..." : "Create Account"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
