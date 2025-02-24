"use client";
import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CNavItem,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";

import Footer from "../Footer";
import { cilSpeedometer, cilCloudDownload, cilLayers } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import MainHeader from "../MainHeader";
import AboutUs from "../AboutUs";
import ServicesSection from "../ServicesSection";
import Portfolio from "../components/Portfolio";
import CarCard from "../components/CarCard";
import { Car, Cars } from "../common/common";
import { Form } from "react-bootstrap";

export default function Admin() {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [togglePage, setTogglePage] = useState({
    header: true,
    about: false,
    services: false,
    portfolio: false,
    contact: false,
    listing: false
  });

  useEffect(() => {
  }, [togglePage])

  const handleTogglePage = (param: string) =>  {
   setTogglePage((prevState) => {
    return {
      ...prevState,
      header: false,
      about: false,
      services: false,
      portfolio: false,
      contact: false,
      listing: false,
      [param]: true
     } 
   });  
  }

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
  }
  return (
    <CContainer fluid>     
      <CRow>
        <CCol className="col-12 p-0 m-0 d-lg-none d-sm-block">
          <CButton 
              className="navbar-toggler navbar-toggler-right" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarResponsive" 
              aria-controls="navbarResponsive" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
              style={{ background: '#fefefe', zIndex: 1}}
              onClick={toggleSidebar}
            >
              <span className="navbar-toggler-icon"></span> 
            </CButton>
      </CCol>
      <CCol className="col-2 p-0 m-0" id="mainNav">
        <CContainer style={{ background: '#ffffff'}}>     
        <CSidebar className="border-end border-start dark collapse navbar-collapse"  style={{ background: '#ffffff', zIndex: 1, display: `${sidebarShow ? 'block' : 'none'}` }} colorScheme="dark" position="fixed">
        <CSidebarHeader className="border-bottom p-5 text-center">
          <CSidebarBrand>Majestic Journey</CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav className="text-center border-bottom">
          <CNavItem href="#" className={`list-unstyled p-3 ${togglePage.header ? 'nav-item-active' : ''}`} onClick={() => handleTogglePage('header')} >
            <CIcon customClassName="nav-icon pr-1" icon={cilSpeedometer} height={24} width={24} /> Header
          </CNavItem>
          <CNavItem href="#" className={`list-unstyled p-3 ${togglePage.about ? 'nav-item-active' : ''}`}  onClick={() => handleTogglePage('about')} >
            <CIcon customClassName="nav-icon pr-1" icon={cilSpeedometer} height={24} width={24} /> About
          </CNavItem>
          <CNavItem  href="#" className={`list-unstyled p-3 ${togglePage.services ? 'nav-item-active' : ''}`}  onClick={() => handleTogglePage('services')}>
            <CIcon customClassName="nav-icon pr-1" icon={cilCloudDownload} height={24} width={24} />
            Services
          </CNavItem>
          <CNavItem  href="#" className={`list-unstyled p-3 ${togglePage.portfolio ? 'nav-item-active' : ''}`}  onClick={() => handleTogglePage('portfolio')}>
            <CIcon customClassName="nav-icon pr-1" icon={cilCloudDownload} height={24} width={24} />
            Portfolio
          </CNavItem>
          <CNavItem href="#" className={`list-unstyled p-3 ${togglePage.listing ? 'nav-item-active' : ''}`}  onClick={() => handleTogglePage('listing')}>
            <CIcon customClassName="nav-icon pr-1" icon={cilCloudDownload} height={24} width={24} />
            Cars Listing
          </CNavItem>
          <CNavItem href="#" className={`list-unstyled p-3 ${togglePage.contact ? 'nav-item-active' : ''}`}  onClick={() => handleTogglePage('contact')}>
            <CIcon customClassName="nav-icon pr-1 list-unstyled" icon={cilLayers} height={24} width={24}/> Contact Us
          </CNavItem>
        </CSidebarNav>
        </CSidebar>
        </CContainer>
      </CCol>
      
      <CCol className="col-10 p-0 m-0" >
        <CCol>
          <CRow>
            <CCol className="col-12 pt-5 m-0 text-center">
              <h1>Header</h1>
            </CCol>
          </CRow>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox" />
          </Form>
        </CCol>
      <hr/>

        {          
          togglePage.header && (
            <MainHeader></MainHeader>
          )
        }        
        {togglePage.about && <AboutUs /> }
        { togglePage.services && <ServicesSection /> }
        { togglePage.portfolio && <Portfolio/> }
        <CRow className="justify-content-center mt-5">
          { togglePage.listing ? (
            Cars.map((car: Car) => {
              return <CarCard  key={car.id} id={car.id} name={car.name} price={car.price} image={car.image} description={car.description} colors={car.colors} />
            })
          ) : null } 
        </CRow>
        { togglePage.contact && <MainHeader></MainHeader> }    
        
        <CRow className="justify-content-center mt-5">
        <Footer></Footer>
        </CRow>
      </CCol>      
      </CRow>      
    </CContainer>
  );
};


