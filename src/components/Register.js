//Register page implementation

import React, { useState, useEffect } from "react";
import { Icon, Input } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Person from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import TextField  from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      sex: "",
      dob: "",
      placeofbirth: "",
      address: "",
      country: "",
      accounttype: "",
      documenttype: "",
      documentid: "",
      role: "",
      password: "",
      confirmPassword: "",
      acceptTerms:false,
  };

  const validationSchema = Yup.object().shape({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      username: Yup.string()
          .required('Username is required')
          .min(6, 'Username must be at least 6 characters')
          .max(20, 'Username must not exceed 20 characters'),
      phone: Yup.string()
          .required('Phone number is required')
          .min(9, 'Phone number must be at least 9 characters')
          .max(20, 'Phone number must not exceed 20 characters'),
      email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
      sex: Yup.string().required('Sex is required'),
      dob: Yup.string().required('Date of birth is required'),
      placeofbirth: Yup.string()
          .required('Place of birth is required')
          .min(4, 'Place of birth must be at least 4 characters')
          .max(20, 'Place of birth must not exceed 20 characters'),
      country: Yup.string()
          .required('Country is required')
          .min(4, 'Country must be at least 4 characters')
          .max(20, 'Country must not exceed 20 characters'),
      address: Yup.string()
          .required('Address is required')
          .min(4, 'Address must be at least 4 characters')
          .max(20, 'Address must not exceed 20 characters'),
      accounttype: Yup.string()
          .required('Account Type is required')
          .min(4, 'Account Type must be at least 4 characters')
          .max(20, 'Account Type must not exceed 20 characters'),
      documenttype: Yup.string()
          .required('Document Type is required')
          .min(4, 'Document Type must be at least 4 characters')
          .max(20, 'Document Type must not exceed 20 characters'),
      documentid: Yup.string()
          .required('Document ID is required')
          .min(4, 'Document ID must be at least 4 characters')
          .max(20, 'Document ID must not exceed 20 characters'),
      role: Yup.string()
          .required('Role is required')
          .min(4, 'Role must be at least 4 characters')
          .max(20, 'Role must not exceed 20 characters'),
      password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  });

  const handleRegister = (formValue) => {
      const { username,firstname,lastname,email,phone,sex,dob,placeofbirth,address,
          country,accounttype,documenttype,documentid,role,password,confirmPassword,
          acceptTerms} = formValue;

    setSuccessful(false);

      dispatch(register({
          username, firstname, lastname, email, phone, sex, dob, placeofbirth, address,
          country, accounttype, documenttype, documentid, role, password, confirmPassword,
          acceptTerms }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

    // Reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        //props.handleFile(fileUploaded);
    };

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
              >{
                      ({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          resetForm,
                          /* and other goodies */
                      }) =>
                      (
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>                
                      <Field name="username" type="text" id="username" size="small" variant="outlined"
                       placeholder="Enter Username" className="form-control" 
                       InputProps={{
                         endAdornment: (
                            <InputAdornment position="start">
                              <IconButton>
                                  <Person />
                              </IconButton>
                            </InputAdornment>
                         )
                        }}/>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                   <label htmlFor="firstname">First Name</label>
                   <Field name="username" type="text" id="username"
                      placeholder="Enter First Name" className="form-control" />
                   <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert alert-danger"
                   />
                </div>
                <div className="form-group">
                   <label htmlFor="lastname">Last Name</label>
                   <Field name="lastname" type="text" id="lastname"
                      placeholder="Enter Last Name" className="form-control" />
                   <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert alert-danger"
                   />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" id="email"
                   placeholder="Enter Email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                 </div>
                 <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field name="phone" type="phone" id="phone"
                      placeholder="Enter Phone number" className="form-control" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="sex">Gender</label>
                    <select id="category" name="category" className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}>
                      <option value="">Select Gender</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>                        
                    <ErrorMessage
                      name="sex"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="email">Date of Birth</label>
                    <Field name="date" type="date" id="date"
                      placeholder="Enter Date of Birth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      className="form-control" />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                 <div className="form-group">
                    <label htmlFor="placeofbirth">Place of Birth</label>
                    <Field name="placeofbirth" type="text" id="placeofbirth"
                        placeholder="Enter Place of Birth" className="form-control" />
                    <ErrorMessage
                        name="placeofbirth"
                        component="div"
                        className="alert alert-danger"
                     />
                 </div>
                 <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field name="address" type="text" id="address"
                       placeholder="Enter Address" className="form-control" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select id="category" name="category" className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}>
                      <option value="">Select Country</option>
                      <option value="cameroon">Cameroon</option>
                      <option value="nigeria">Nigeria</option>
                    </select>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="accounttype">Account Type</label>
                    <select id="category" name="category" className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}>
                      <option value="">Select Account Type</option>
                      <option value="personal">Personal</option>
                      <option value="business">Business</option>
                    </select>
                    <ErrorMessage
                      name="accounttype"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="documenttype">Document Type</label>
                    <select id="category" name="category" className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}>
                      <option value="">Select Document Type</option>
                      <option value="cni">National Identity Cart</option>
                      <option value="passport">Passport</option>
                      <option value="residencepermit">Residence Permit</option>
                    </select>
                    <ErrorMessage
                      name="documenttype"
                      component="div"
                      className="alert alert-danger"
                    />
                 </div>
                 <div className="form-group">
                    <label htmlFor="documentid">Document ID</label>
                       <input
                       type="file"
                       ref={hiddenFileInput}
                       onChange={handleChange}
                    />
                 </div>
                 <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={values.password}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <Field
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  value={values.confirmPassword}
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group form-check">
                <Field
                  name="acceptTerms"
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I have read and agree to the Terms
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                  <button type="button" onClick={resetForm} className="btn btn-warning float-right">
                  Reset </button>
                </div>
              </div>
            )}
                          </Form>
                      )
                  }
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
