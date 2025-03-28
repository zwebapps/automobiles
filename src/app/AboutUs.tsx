import { useState, useEffect } from "react";

export default function AboutUs({type = "about"}: {type: string}) {
     const [about, setAbout] = useState<{[key: string]: string}>();
        useEffect(() => {
            fetch(`/api/post/${type}`, {
                method: "GET",
            }).then(async(res) => {              
                const data = await res.json()as [{header: string, image: string, type: string, data: string}];
                const post = data[0];
                console.log('About us res', data)
                setAbout(JSON.parse(post.data));
            })
        }, [type]);
  
    return (       
        <section className="about-us" id="about">
        <div className="container">
            <div className="text-center">
                <h2>About</h2>
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