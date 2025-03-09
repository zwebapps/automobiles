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
import { getImage } from "./commonUtils";

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
            }).then(async (res) => {
            setLoading(false);
            const jsonData = await res.json(); 
            setPosts(jsonData);           
        });
    }  
    const deletePost = async (id: string) => {
        await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            }).then(async (res) => {
            toast.success(res.statusText);
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
              <CTableHeaderCell scope="col">Image</CTableHeaderCell>
              <CTableHeaderCell scope="col">Data</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {posts.length > 0 && (
              (posts as PostType[]).map((post: PostType, index: number) => { 
                 return (
                   <CTableRow key={index}>
                     <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                     <CTableDataCell>{post.name}</CTableDataCell>
                     <CTableDataCell>
                       <Image
                           className="img-fluid"
                           src={getImage(post.data as string)}
                           alt="logo"
                           width={460}
                           height={360}
                           priority
                           />
                       
                       </CTableDataCell>
                     <CTableDataCell>{post.data}</CTableDataCell>
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
