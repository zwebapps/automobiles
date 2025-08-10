"use client";
import { useState, useEffect } from "react";

export default function AboutUs({type = "about"}: {type: string}) {
     const [about, setAbout] = useState<{[key: string]: string}>();
        useEffect(() => {
            fetch(`/api/post/${type}`, {
                method: "GET",
            }).then(async(res) => {              
                const data: [{ name: string, image: string, type: string, data: string}] = await res.json();
                const post = data.find(dt => dt.name === type);
                console.log('About us res', data)
                if(post){
                    setAbout(post.data && JSON.parse(post.data));
                }
            })
        }, [type]);
  
    return (       
        <section className="about-us" id="about">
        <div className="container">
            <div className="text-center">
                <h2>About Us</h2>
                <div className="line-shape"></div>
                {about &&  
                <p>
                    {about.description}
                </p> 
                }                      
            </div>
        </div>
    </section>
    )
}