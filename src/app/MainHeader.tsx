'use client'
import { useEffect, useState } from "react"
import Typewriter from './components/Typewriter';

export default function MainHeader({type = "header"}: {type: string}) {
    // const [loading, setLoading] = useState(false);
    const [headData, setHeadData] = useState<{header: string, image: string, type: string, data: string}>();
    useEffect(() => {      
     
        fetch(`/api/post/${type}`, {
            method: "GET",
        }).then(async(res) => {
            const data = await res.json()as [{header: string, image: string, type: string, data: string}];
            console.log('Main Header res', data)
            const post = Array.isArray(data)? data[0] : data;            
            if(post && post.data) {
              setHeadData(JSON.parse(post.data));
            }
        })

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            if (
              target.tagName === 'A' &&
              target.getAttribute('href')?.startsWith('#')
            ) {
              const href = target.getAttribute('href')!;
              if(href === '#') return
              const el = document.querySelector(href);            
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          };
        
          document.addEventListener('click', handleClick);
          return () => document.removeEventListener('click', handleClick);
    }, [type]);
    
    return (
        headData && (
            <header className="background-main" style={{ backgroundImage: `url(/uploads/${headData ? headData.image : 'bg-1.jpeg'})`}}>
            <main className="main">
             <Typewriter
                    words={[
                        "Technology",
                        "Performance", 
                        "Eco-Friendly", 
                        "Comfort"
                    ]}
                    period={3000}
                />
            </main>
            <div className="text-center">
                <a className="main-link btn btn-lg"  href="">
                    See more
                    <i className="fa fa-chevron-down"></i>
                </a> 
            </div>
        </header>
        )        
    )
}