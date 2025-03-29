'use client'
import { useEffect, useState } from "react"
// import { fetPostByName } from "./Services/PostService";

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
    }, [type]);
    
    return (
        headData && (
            <header className="background-main" style={{ backgroundImage: `url(/uploads/${headData ? headData.image : 'bg-1.jpeg'})`}}>
            <main className="main">
            { headData && (
                <h1 className="main-title">{headData.header}
                    <a href="" className="typewrite" data-period="3000" data-type='[ "Creative", "Future", "Enterteinment", "Freedom" ]'>
                        <span className="wrap"></span>
                    </a>
                </h1>
            )}            
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