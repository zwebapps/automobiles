"use client";
import Image from "next/image";
import Nav from "./Nav";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import AboutUs from "./AboutUs";
import ServicesSection from "./ServicesSection";
import CarCard from "./components/CarCard";
import { CRow } from "@coreui/react";
import { Car, Cars } from "./common/common";



export default function Home() {
  return (
    <div>
    <Nav />
    <MainHeader />
    <AboutUs />
    <br />
    <ServicesSection />
    <br /> 
    <CRow>
    {     
    Cars.map((car: Car) => {
       return <CarCard  key={car.id} id={car.id} name={car.name} price={car.price} image={car.image} description={car.description} colors={car.colors} />
    })
    }
    </CRow>
    <div className="container text-center" id="portfolio">
            <h2 className="portfolio-title">Portfolio</h2>
            <div className="line-shape"></div>
    </div>
    <section>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <div className="p-5">
                        <Image
                          className="img-fluid rounded-circle"
                          src="/portfolio/p-1.jpeg"
                          alt="logo"
                          width={180}
                          height={38}
                          priority
                        /> 
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="p-5">
                        <h2 className="display-4">For those about to rock...</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="p-5">
                        <Image
                          className="img-fluid rounded-circle"
                          src="/portfolio/p-2.jpeg"
                          alt="logo"
                          width={180}
                          height={38}
                          priority
                        /> 
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <h2 className="display-4">We salute you!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <div className="p-5">
                        <Image
                          className="img-fluid rounded-circle"
                          src="/portfolio/p-3.jpeg"
                          alt="logo"
                          width={180}
                          height={38}
                          priority
                        />
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="p-5">
                        <h2 className="display-4">Let there be rock!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="contact-us" id="contact">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Contact us</h2>
                    <div className="line-shape"></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat harum incidunt id quas, facere amet modi quisquam, voluptate ad dolores soluta molestias rerum excepturi delectus mollitia porro, adipisci eveniet qui!</p>
                </div>
            </div>
        </div>
        <div className="container">
            <form>
                <div className="row">
                    <div className="col-md-6 form-line">
                        <div className="form-group">
                            <label htmlFor="exampleInputUsername">Your name</label>
                            <input type="text" className="form-control" id="" placeholder=" Enter Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email Address</label>
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder=" Enter Email id" />
                        </div>	
                        <div className="form-group">
                            <label htmlFor="telephone">Mobile No.</label>
                            <input type="tel" className="form-control" id="telephone" placeholder=" Enter 10-digit mobile no." />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="description"> Message</label>
                            <textarea  className="form-control" id="description" placeholder="Enter Your Message"></textarea>
                        </div>
                        <button type="button" className="btn btn-primary submit"><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
                    </div>        
                </div>
            </form>
        </div>
    </section>
    <br />
    <Footer></Footer>
    </div>
  );
}
