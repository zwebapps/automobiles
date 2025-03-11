"use client";

import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RegisterAdmin() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {}, []);

  const createUser = async () => {
    console.log("formdata", formData);
    fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify(formData),
    }).then(async (res) => {
      console.log("res", res);
    });
  };

  const formSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {      
      e.stopPropagation();
    }
    if(formData.password !== formData.confirmPassword){
        toast.error('Password does not match');
        return;
    }
    setValidated(true);
    await createUser();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CContainer className="text-center">
      <CRow className="justify-content-center p-5">
        <Col col={12} lg={12} md={12} sm={12}>
          <h1>Admin Registration</h1>
        </Col>
      </CRow>
      <CRow>
        <CForm
          className="row g-3 needs-validation"
          onSubmit={formSumbit}
          noValidate
          validated={validated}
        >
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="text"
                name="firstName"
                id="firstName"
                label="First name"
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                onChange={(e) => onChangeInput(e)}
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="text"
                name="lastName"
                id="lastName"
                label="Last name"
                onChange={(e) => onChangeInput(e)}
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="text"
                name="userName"
                id="userName"
                label="User Name"
                onChange={(e) => onChangeInput(e)}
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="email"
                name="email"
                id="email"
                label="Email"
                onChange={(e) => onChangeInput(e)}
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="Password"
                name="password"
                id="password"
                label="Password"
                onChange={(e) => onChangeInput(e)}
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-3">
            <CCol lg={6} md={6} sm={12} className="text-start">
              <CFormInput
                type="Password"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                onChange={(e) => onChangeInput(e)}
                feedbackValid="Looks good"
                feedbackInvalid="All values are required"
                required
              />
            </CCol>
          </CRow>
          <CRow className="justify-content-center pt-4">
            <CCol lg={6} md={6} sm={12} className="text-center">
              <CButton color="primary w-100" type="submit">
                Login
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CRow>
      <Col className="text-center p-5">
        <Footer />
      </Col>
    </CContainer>
  );
}
