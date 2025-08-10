"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getImageUrl } from "./components/commonUtils";
export default function ServicesSection({type = "services"}: {type: string}) {
     const [services, setServices] = useState<{[key: string]: string}[]>();
            useEffect(() => {
                fetch(`/api/post/${type}`, {
                    method: "GET",
                }).then(async(res) => {
                    console.log('Services res', res)
                    let post = await res.json();
                    console.log('Services res after json', res)
                        post = post.map((p: {[key: string]: string}) => JSON.parse(p.data)) as [{[type: string]: string, image: string, type: string, data: string}]; 
                        setServices(post);
                })
            }, [type]);
      
    return (
        <section className="services-class" id="services">
                <div className="container">    
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">At Your Service</h2>
                            <div className="line-shape"></div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {services && services.map((service: {[key: string]: string}, index : number) => {
                            return (
                                <div className="col-lg-3 col-md-6 text-center" key={index}>
                                <div className="service-box mt-5 mx-auto">
                                <Image
                                    className="img-fluid"
                                    src={`/uploads/${getImageUrl(service.image)}`}
                                    alt="logo"
                                    width={460}
                                    height={360}
                                    unoptimized
                                    priority
                                    />
                                <h3 className="mb-3">{service.services && service.services.substring(0, 15)}</h3>
                                <p className="text-muted mb-0">{service.description && service.description.substring(0, 100)}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </section>
    )
}