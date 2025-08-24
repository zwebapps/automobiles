'use client'
import { useState, useEffect } from "react";
import { initialSocial, Social } from "./components/FooterForm";
import { BrandName } from "./components/DynamicBrand";

// Extend Window interface to include openPrivacyCenter
declare global {
  interface Window {
    openPrivacyCenter?: () => void;
  }
}


export default function Footer () {
    const [formValues, setFormValues] = useState<Social>(initialSocial);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("/api/social", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
                }
              }).then(async(res) => {
                if(res) {
                    const JsonData = await res.json();
                    if(JsonData && JsonData.data) {
                    let socials = JSON.parse(JsonData.data);
                        if (socials && typeof socials === "object") {
                            socials = JSON.parse(socials.data)
                            console.log('socials 1', socials)
                            setFormValues(socials);               
                        }
                    } else {
                    setFormValues(initialSocial);
                    }
                }
            }
        );
      }, []);
    return (
        <footer className="footer text-center">
        <div className="container">
            <ul className="list-inline mb-5">
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" target="blank" href={formValues.facebook}>
                    <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" target="blank" href={formValues.twitter}>
                    <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white mr-3" target="blank" href={formValues.homepage}>
                    <i className="fas fa-car-crash"></i>
                    </a>
                </li>               
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white" target="blank" href={formValues.instagram}>
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-link rounded-circle text-white" target="blank" href={formValues.tiktok}>
                        <i className="fab fa-tiktok"></i>
                    </a>
                </li>
            </ul>
            <p className="text-muted small mb-0">Copyright &copy; <BrandName /> 2025</p>
            <a href="#" onClick={(e) => { e.preventDefault(); window?.openPrivacyCenter?.(); }}>Privacy settings</a>

        </div>
        </footer>
    )
}