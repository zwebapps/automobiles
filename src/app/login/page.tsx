"use client";
// import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState<{[key: string]: string}>({       
        userName: "",        
        password: ""
    });
  useEffect(() => {
   
      document.body.style.background = `url(/uploads/backgound-login.jpg) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundBlendMode = "darken";
      document.body.style.color = "#fff";
  
    // Clean up the background when leaving the login page
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const formSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return;
    }
    console.log(formData);
    await loginUser();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async () => {
    fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify(formData),
    }).then(async (res) => {
        const data = await res.json();      
        if(res.status === 200){
          localStorage.setItem('token', data);
          router.push('/admin');
          return toast.success('User logged in successfully');
        }
        toast.error('Provide correct credentials');
    });
  };

  return (
    
       <CContainer className="text-center" >
          <CRow className="justify-content-center p-5">
            <Col col={12} lg={12} md={12} sm={12}>
              <h1>Admin Login</h1>
            </Col>
          </CRow>
          <CRow className="justify-content-center p-5">
          <CForm className="row g-3 needs-validation" onSubmit={formSumbit} noValidate validated={validated}>             
             
              <CRow className="justify-content-center pt-3">
                <CCol lg={6} md={6} sm={12} className="text-start">
                  <CFormInput
                    type="text"
                    name="userName"
                    id="userName"
                    label="User Name"
                    onChange={(e) => onChangeInput(e)}
                    feedbackValid="Looks good"
                    feedbackInvalid="User name is required"
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
                    feedbackInvalid="Password is also required"
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
