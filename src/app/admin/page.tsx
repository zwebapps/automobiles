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
import {
  cilSpeedometer,
  cilCloudDownload,
  cilLayers,
  cilHamburgerMenu,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import MainHeader from "../MainHeader";
import AboutUs from "../AboutUs";
import ServicesSection from "../ServicesSection";
import Portfolio from "../components/Portfolio";
import CarCard from "../components/CarCard";
import { Car, Cars } from "../common/common";
import DynamicForm from "../components/DynamicForm";
import AdminHeader from "../components/AdminHeader";
import ContactUs from "../components/ContactUs";
import DisplayAllPosts from "../components/DisplayAllPosts";

type FormField = {
  label: string;
  name: string;
  type: string;
  id: string;
  placeholder: string;
};
type FormFields = {
  [key: string]: FormField[];
};
const formFields: FormFields = {
  header: [
    {
      label: "Header",
      name: "header",
      type: "text",
      id: "header",
      placeholder: "Header",
    },
    {
      name: "headerImage",
      label: "Header background",
      id: "headerImage",
      type: "file",
      placeholder: "Enter header Image",
    }
  ],
  about: [
    {
      label: "About",
      name: "about",
      type: "text",
      id: "about",
      placeholder: "About",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      id: "description",
      placeholder: "About Description",
    }
  ],
  services: [    
    {
      label: "Services",
      name: "services",
      type: "text",
      id: "services",
      placeholder: "Services",
    },
    {
      name: "Service Logo",
      label: "Service Logo",
      id: "serviceLogo",
      type: "file",
      placeholder: "Enter service logo image",
    },
    {
      label: "Service Description",
      name: "description",
      type: "textarea",
      id: "description",
      placeholder: "Service Description",
    }
  ],
  portfolio: [
    {
      label: "Portfolio",
      name: "portfolio",
      type: "text",
      id: "portfolio",
      placeholder: "Portfolio",
    },
  ],
  contact: [
    {
      label: "Contact",
      name: "contact",
      type: "text",
      id: "contact",
      placeholder: "Contact",
    },
  ],
  listing: [
    {
      label: "Vehicle Name / Model",
      name: "vehicleName",
      type: "text",
      id: "vehicleName",
      placeholder: "Vehicle Name / Model",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      id: "description",
      placeholder: "Vehicle details",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      id: "price",
      placeholder: "Vehicle Price",
    },
    {
      label: "Vehicle Color",
      name: "vehicleColor",
      type: "color",
      id: "vehicleColor",
      placeholder: "Vehicle Color",
    },
    {
      label: "Vehicle Image",
      name: "vehicleImage",
      type: "file",
      id: "vehicleImage",
      placeholder: "Vehicle Image",
    },
  ],
};

type FormType =
  | "header"
  | "about"
  | "services"
  | "portfolio"
  | "contact"
  | "listing" | "Posts";

export default function Admin() {
  const [formType, setFormType] = useState<FormType>("header");
  const [fields, setFields] = useState<FormField[]>([]);
  const [sidebarShow, setSidebarShow] = useState(true);
  const [mainContainer, setMainContainer] = useState({});
  const [togglePage, setTogglePage] = useState({
    header: true,
    about: false,
    services: false,
    portfolio: false,
    contact: false,
    listing: false,
    Posts: false
  });

  useEffect(() => {
    setFields(formFields[formType]);
  }, [formType]);
  const handleTogglePage = (param: FormType) => {
    setFormType(param);
    setTogglePage((prevState) => {
      return {
        ...prevState,
        header: false,
        about: false,
        services: false,
        portfolio: false,
        contact: false,
        listing: false,
        [param]: true,
      };
    });
  };

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
    if (sidebarShow) {
      setMainContainer({
        zIndex: -1,
        display: "block",
        position: "relative",
      });
    }
  };
  
  return (
    <CContainer fluid>
      <CRow>
        <CCol className="col-12 p-0 m-0 d-lg-none d-sm-block admin-toggle-btn">
          <CButton
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <CIcon
              customClassName="nav-icon pr-1"
              icon={cilHamburgerMenu}
              height={24}
              width={24}
            />
          </CButton>
        </CCol>
        <CCol
          className="col-lg-2 col-md-12 col-sm-12 p-0 m-0 collapse navbar-collapse"
          style={{
            background: "#ffffff",
            zIndex: 1,
            display: `${sidebarShow ? "block" : "none"}`,
            position: "relative",
          }}
          id="mainNav"
        >
          <CContainer
            style={{
              background: "#ffffff",
              position: `${sidebarShow ? "absolute" : "static"}`,
            }}
          >
            <CSidebar
              className="border-end border-start dark"
              colorScheme="dark"
            >
              <CSidebarHeader className="border-bottom p-5 text-center">
                <CSidebarBrand>Majestic Journey</CSidebarBrand>
              </CSidebarHeader>
              <CSidebarNav className="text-center border-bottom">
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.header ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("header")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilSpeedometer}
                    height={24}
                    width={24}
                  />{" "}
                  Header
                </CNavItem>
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.about ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("about")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilSpeedometer}
                    height={24}
                    width={24}
                  />{" "}
                  About
                </CNavItem>
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.services ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("services")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilCloudDownload}
                    height={24}
                    width={24}
                  />
                  Services
                </CNavItem>
                {/* <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.portfolio ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("portfolio")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilCloudDownload}
                    height={24}
                    width={24}
                  />
                  Portfolio
                </CNavItem> */}
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.listing ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("listing")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1"
                    icon={cilCloudDownload}
                    height={24}
                    width={24}
                  />
                  Cars Listing
                </CNavItem>
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.contact ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("contact")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1 list-unstyled"
                    icon={cilLayers}
                    height={24}
                    width={24}
                  />{" "}
                  Contact Us
                </CNavItem>
                <CNavItem
                  href="#"
                  className={`list-unstyled p-3 ${
                    togglePage.Posts ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("Posts")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1 list-unstyled"
                    icon={cilLayers}
                    height={24}
                    width={24}
                  />{" "}
                  All Posts
                </CNavItem>
              </CSidebarNav>
            </CSidebar>
          </CContainer>
        </CCol>

        <CCol
          className="col-lg-10 col-md-12 col-sm-12 p-0 m-0"
          style={{ ...mainContainer }}
        >
          <CRow className="justify-content-center">
            <CCol className="col-8">
              <AdminHeader type={formType} />
            </CCol>
            <CCol className="col-8">              
              <DynamicForm key={`${formType}-form`} type={formType} formFields={fields} />
            </CCol>
          </CRow>
          <hr />

          {togglePage.header && <MainHeader></MainHeader>}
          {togglePage.about && <AboutUs />}
          {togglePage.services && <ServicesSection />}
          {togglePage.portfolio && <Portfolio />}
          <CRow className="justify-content-center mt-5">
            {togglePage.listing
              ? Cars.map((car: Car) => {
                  return (
                    <CarCard
                      key={car.id}
                      id={car.id}
                      name={car.name}
                      price={car.price}
                      image={car.image}
                      description={car.description}
                      color={car.color}
                    />
                  );
                })
              : null}
          </CRow>
          {togglePage.contact && <ContactUs></ContactUs>}
          {togglePage.Posts && <DisplayAllPosts/>}
          <CRow className="justify-content-center mt-5">
            <Footer></Footer>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  );
}
