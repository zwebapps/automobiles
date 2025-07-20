"use client";
import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CRow,

} from "@coreui/react";

import Footer from "../Footer";
import {
  cilHamburgerMenu,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import MainHeader from "../MainHeader";
import AboutUs from "../AboutUs";
import ServicesSection from "../ServicesSection";
import DynamicForm from "../components/DynamicForm";
import AdminHeader from "../components/AdminHeader";
import ContactUs from "../components/ContactUs";
import DisplayAllPosts from "../components/DisplayAllPosts";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import FooterForm from "../components/FooterForm";
import CarListingsComponent from "../components/CarListingsComponent";


export type FormField = {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  id: string;
  placeholder: string;
};
export type FormFields = {
  [key: string]: FormField[];
};
const formFields: FormFields = {
  header: [
    {
      label: "Header",
      name: "header",
      type: "text",
      id: "header",
      defaultValue: "Automotive’s",
      placeholder: "Header",
    },
    {
      name: "headerImage",
      label: "Header background",
      id: "headerImage",
      defaultValue: "",
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
      defaultValue: "",
      placeholder: "About",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      id: "description",
      defaultValue: "",
      placeholder: "About Description",
    }
  ],
  services: [    
    {
      label: "Services",
      name: "services",
      type: "text",
      id: "services",
      defaultValue: "",
      placeholder: "Services",
    },
    {
      name: "Service Logo",
      label: "Service Logo",
      id: "serviceLogo",
      type: "file",
      defaultValue: "",
      placeholder: "Enter service logo image",
    },
    {
      label: "Service Description",
      name: "description",
      type: "textarea",
      id: "description",
      defaultValue: "",
      placeholder: "Service Description",
    }
  ],
  portfolio: [
    {
      label: "Portfolio",
      name: "portfolio",
      type: "text",
      id: "portfolio",
      defaultValue: "",
      placeholder: "Portfolio",
    },
  ],
  contact: [
    {
      label: "Contact",
      name: "contact",
      type: "text",
      id: "contact",
      defaultValue: "",
      placeholder: "Contact",
    },
  ],
  listing: [
    {
      label: "Car Name",
      name: "name",
      type: "text",
      id: "name",
      defaultValue: "",
      placeholder: "Car Name (e.g. Tesla Model S)",
    },
    {
      label: "Make",
      name: "make",
      type: "text",
      id: "make",
      defaultValue: "",
      placeholder: "Brand/Make (e.g. Tesla)",
    },
    {
      label: "Model",
      name: "model",
      type: "text",
      id: "model",
      defaultValue: "",
      placeholder: "Model (e.g. S, M3, Camry)",
    },
    {
      label: "Year",
      name: "year",
      type: "number",
      id: "year",
      defaultValue: "",
      placeholder: "Year (e.g. 2022)",
    },
    {
      label: "Mileage",
      name: "mileage",
      type: "number",
      id: "mileage",
      defaultValue: "",
      placeholder: "Mileage (km)",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      id: "price",
      defaultValue: "",
      placeholder: "Vehicle Price",
    },
    {
      label: "Vehicle Color",
      name: "vehicleColor",
      type: "color",
      id: "vehicleColor",
      defaultValue: "#000000",
      placeholder: "Vehicle Color",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      id: "description",
      defaultValue: "",
      placeholder: "Enter car description with rich text formatting",
    },
    {
      label: "Main Image",
      name: "mainImage",
      type: "file",
      id: "mainImage",
      defaultValue: "",
      placeholder: "Main Image",
    },
    {
      label: "Gallery Image 1",
      name: "galleryImage1",
      type: "file",
      id: "galleryImage1",
      defaultValue: "",
      placeholder: "Gallery Image 1",
    },
    {
      label: "Gallery Image 2",
      name: "galleryImage2",
      type: "file",
      id: "galleryImage2",
      defaultValue: "",
      placeholder: "Gallery Image 2",
    },
    {
      label: "Gallery Image 3",
      name: "galleryImage3",
      type: "file",
      id: "galleryImage3",
      defaultValue: "",
      placeholder: "Gallery Image 3",
    },
    {
      label: "Gallery Image 4",
      name: "galleryImage4",
      type: "file",
      id: "galleryImage4",
      defaultValue: "",
      placeholder: "Gallery Image 4",
    },
  ],
};

export type FormType =
  | "header"
  | "about"
  | "services"
  | "contact"
  | "listing" 
  | "Posts" 
  | "footer"
  | "car-listings";

export default function Admin() {
  const router = useRouter();
  const [formType, setFormType] = useState<FormType>('header');
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
    Posts: false,
    footer: false,
    "car-listings": false
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login")
      } else {        
          setFields(formFields[formType]);
        }
      }    
  }, [formType, router]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login")
  }
  const handleTogglePage = (param: FormType) => {
    debugger
    setFormType(param);
    setTogglePage((prevState) => {
      return {
        ...prevState,
        header: false,
        about: false,
        services: false,
        contact: false,
        listing: false,
         Posts: false,
         footer: false,
         "car-listings": false,
        [param]: true,
      };
    });
    debugger
    console.log("togglePage", togglePage);
    console.log("param", param, 'fields', fields);
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
    formType &&
    <CContainer fluid >
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
            <AdminSidebar
              handleTogglePage={(e:FormType) => handleTogglePage(e)}
              handleLogout={handleLogout}
              togglePage={togglePage}              
            />
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
            {!togglePage.footer && !togglePage["car-listings"] && <DynamicForm key={`${formType}-form`} type={formType} formFields={fields} />}
              
            </CCol>
          </CRow>
          <hr />

          {togglePage.header && <MainHeader type="header"></MainHeader>}
          {togglePage.about && <AboutUs type="about" />}
          {togglePage.services && <ServicesSection type="services" />}        
          {togglePage.contact && <ContactUs type="contact"></ContactUs>}
          {togglePage.footer && <FooterForm type="footer"/>}
          {togglePage.Posts && <DisplayAllPosts/>}
          {togglePage["car-listings"] && <CarListingsComponent />}
          <CRow className="justify-content-center mt-5">
            <Footer></Footer>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  );
}
