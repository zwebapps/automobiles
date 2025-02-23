"use client";
import React, { useEffect, useState } from "react";
import {
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

export default function Admin() {
  // const [sidebarShow, setSidebarShow] = useState();
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
  return (
    <CContainer fluid>
      <CRow>
      <CCol className="col-2 p-0 m-0">
      <CSidebar className="border-end border-start dark" colorScheme="dark">
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
      </CCol>
      <CCol className="col-10 p-0 m-0">
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


