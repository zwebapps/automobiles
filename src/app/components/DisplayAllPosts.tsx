"use client";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PostType = {
    _id: React.ReactNode | number;
    name: string;
    data: React.ReactNode;
    image?: string;
    createdAt?: Date;
  };

export default function DisplayAllPosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([] as PostType[]);
    useEffect(() => {
        getPosts();
    }, [loading]);
    const getPosts = async () => {
        await fetch("/api/post", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            }).then(async (res) => {
            setLoading(false);
            const jsonData = await res.json(); 
            setPosts(jsonData);           
        });
    }  
    const deletePost = async (id: string) => {
        await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
               authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }).then(async (res) => {
            if(res.status === 200) {
              toast.success('Post deleted successfully');
            }
            getPosts();                   
        });
    }
  return (
    <div className="container">
      <div className="row p-4">
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {posts.length > 0 && (
              (posts as PostType[]).map((post: PostType, index: number) => { 
                 // Try to parse post.data as JSON if possible
                 let desc = '';
                 let img = '';
                 try {
                   const parsed = typeof post.data === 'string' ? JSON.parse(post.data) : post.data;
                   desc = parsed?.description?.summary || parsed?.description || '';
                   img = parsed?.image || parsed?.mainImage || '';
                 } catch {
                   desc = post.data as string;
                   img = '';
                 }
                 return (
                   <CTableRow key={index}>
                     <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                     <CTableDataCell>{post.name}</CTableDataCell>
                     <CTableDataCell>{desc}</CTableDataCell>
                     <CTableDataCell>
                       <Image
                           className="img-fluid"
                           src={img || "/no-image.png"}
                           alt="logo"
                           width={120}
                           height={80}
                           unoptimized
                           priority
                           />
                       </CTableDataCell>
                     <CTableDataCell onClick={() => {deletePost(post._id as string)}}>
                       <CIcon
                         customClassName="nav-icon pr-1"
                         icon={cilTrash}
                         height={24}
                         width={24}
                       />{" "}
                     </CTableDataCell>
                   </CTableRow>
                 );
               })
             )
            }
          </CTableBody>
        </CTable>
      </div>
    </div>   
  );
}
