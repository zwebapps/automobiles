export default function ServicesSection() {
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
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1"></i>
                        <h3 className="mb-3">Sturdy Templates</h3>
                        <p className="text-muted mb-0">Our templates are updated regularly so they dont break.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fas fa-4x fa-paper-plane text-primary mb-3 sr-icon-2"></i>
                        <h3 className="mb-3">Ready to Ship</h3>
                        <p className="text-muted mb-0">You can use this theme as is, or you can make changes!</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fas fa-4x fa-code text-primary mb-3 sr-icon-3"></i>
                        <h3 className="mb-3">Up to Date</h3>
                        <p className="text-muted mb-0">We update dependencies to keep things fresh.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fas fa-4x fa-heart text-primary mb-3 sr-icon-4"></i>
                        <h3 className="mb-3">Made with Love</h3>
                        <p className="text-muted mb-0">You have to make your websites with love these days!</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
    )
}