import { useState, useEffect } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

interface Contact {
    image: string;
    type: string;
    editor: string
}

export default function ContactUs({type = "contact"}: {type: string}) {
    const [contact, setContact] = useState<Contact>();
                useEffect(() => {
                    fetch(`/api/post/${type}`, {
                        method: "GET",
                    }).then(async(res) => {
                        let post = await res.json();
                            post = post.map((p: {[key: string]: string}) => JSON.parse(p.data)) as Contact[] ; 
                            console.log('res', post)
                            setContact(post[0]);
                    })
                }, [type]);

    return (
        <section className="contact-us" id="contact">
            <div className="row p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Contact us</h2>
                            <div className="line-shape"></div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat harum incidunt id quas, facere amet modi quisquam, voluptate ad dolores soluta molestias rerum excepturi delectus mollitia porro, adipisci eveniet qui!</p>
                        </div>
                    </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12">                        
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-12 form-line">
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
                            
                                    <div className="form-group">
                                        <label htmlFor="description"> Message</label>
                                        <textarea  className="form-control" id="description" placeholder="Enter Your Message"></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary submit"><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
                                </div>        
                            </div>
                        </form>
                    </div>
                </div> */}
                <div className="col-lg-12 col-md-6 col-sm-12">                        
                    <div className="container">
                        {contact && 
                            <FroalaEditorView model={JSON.parse(contact.editor)} />
                        }
                    </div>
                </div>
            </div> 
        </section>
    );
};
