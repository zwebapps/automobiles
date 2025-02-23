import Image from "next/image";
export default function Portfolio() {
    return (
        <div>
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
        </div>
    )
}