"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import AboutUs from "./AboutUs";
import ServicesSection from "./ServicesSection";
import { CRow } from "@coreui/react";
import ContactUs from "./components/ContactUs";
import ListingComponent from "./ListingComponent";


export default function Home() {
  return (
    <div>
    <Nav />
    <MainHeader type="header" />
    <AboutUs type="about" />   
    <CRow>
    <ListingComponent />
    </CRow>    
    <br />
    <ServicesSection type="services" />
    <br /> 
    <ContactUs type="contact" />
    <br />
    <Footer></Footer>
    </div>
  );
}
