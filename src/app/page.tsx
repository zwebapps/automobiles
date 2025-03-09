"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import AboutUs from "./AboutUs";
import ServicesSection from "./ServicesSection";
import { CRow } from "@coreui/react";
import ContactUs from "./components/ContactUs";
import ListingComponent from "./ListingComponent";
// import Portfolio from "./components/Portfolio";


export default function Home() {
  return (
    <div>
    <Nav />
    <MainHeader type="header" />
    <AboutUs type="about" />
    <br />
    <ServicesSection type="services" />
    <br /> 
    <CRow>
    <ListingComponent type="listing" />
    </CRow>    
   {/* <Portfolio type="portfolio" /> */}
    <ContactUs type="contact" />
    <br />
    <Footer></Footer>
    </div>
  );
}
