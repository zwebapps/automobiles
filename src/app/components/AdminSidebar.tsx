'use client'
import { cilSpeedometer, cilCloudDownload, cilLayers, cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavItem } from "@coreui/react";
import { FormType } from "../admin/page";

export default function AdminSidebar({ togglePage, handleTogglePage, handleLogout }: {
    togglePage: {header: boolean, about: boolean, services: boolean, listing: boolean, contact: boolean, Posts: boolean, footer: boolean},
    handleTogglePage: (param: FormType ) => void,
    handleLogout: () => void
  }) {

    return (
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
                    togglePage.footer ? "nav-item-active" : ""
                  }`}
                  onClick={() => handleTogglePage("footer")}
                >
                  <CIcon
                    customClassName="nav-icon pr-1 list-unstyled"
                    icon={cilLayers}
                    height={24}
                    width={24}
                  />{" "}
                  Social Links
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
                <CNavItem
                  href="#"
                  className="list-unstyled p-3"
                  onClick={() => handleLogout()}
                >
                  <CIcon
                    customClassName="nav-icon pr-1 list-unstyled"
                    icon={cilAccountLogout}
                    height={24}
                    width={24}
                  />{" "}
                  Logout
                </CNavItem>
              </CSidebarNav>
            </CSidebar>
    );
}