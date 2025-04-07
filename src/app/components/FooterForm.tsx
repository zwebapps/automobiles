'use client'
import { CForm, CFormInput, CCol, CButton, CSpinner } from "@coreui/react";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";


export type FormField = {
    label: string;
    name: SocialTypes;
    type: string;
    defaultValue?: string;
    id: string;
    placeholder: string;
  };

  const formFields: FormField[] = [
      {
        label: "Facebook",
        name: "facebook",
        type: "text",
        id: "facebook",
        placeholder: "Facebook  Link",
      },
      {
        label: "Twitter",
        name: "twitter",
        type: "text",
        id: "twitter",
        placeholder: "Twitter  Link",
      },
      {
        label: "Homepage",
        name: "homepage",
        type: "text",
        id: "homepage",
        placeholder: "Homepage  Link",
      },
      {
        label: "Instagram",
        name: "instagram",
        type: "text",
        id: "instagram",
        placeholder: "Instagram  Link",
      }
      ,
      {
        label: "Tiktok",
        name: "tiktok",
        type: "text",
        id: "tiktok",
        placeholder: "Tiktok  Link",
      }
    ];

export type SocialTypes = "facebook" | "twitter" | "homepage" | "instagram" | "tiktok";

export type Social = {
    facebook: string;
    twitter: string;
    homepage: string;
    instagram: string;
    tiktok: string;
  };

 export const initialSocial: Social = {
    facebook: "",
    twitter: "",
    homepage: "",
    instagram: "",
    tiktok: "",
  };

export default function FooterForm ({ type }: {type: string}) {
    const [formValues, setFormValues] = useState<Social>(initialSocial);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        fetch("/api/social", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
                }
              }).then(async(res) => {
                  const JsonData = await res.json();
                  if(JsonData && JsonData.data) {
                    let socials = JSON.parse(JsonData.data);
                    if (socials && typeof socials === "object") {
                        socials = JSON.parse(socials.data)
                        console.log('socials 1', socials)
                        setFormValues(socials);
                        setIsLoading(false);                 
                    }
                } else {
                   setFormValues(initialSocial);
                   setIsLoading(false);      
                }
                
            }
        );
      }, [type]);
      
 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      setLoading(true);
      e.preventDefault();
        if(Object.values(formValues).length === 0 || Object.values(formValues).some((val) => !val)) {
           toast.error('All fields are required'); 
           setLoading(false);
           return;      
        }
    
      const postData = new FormData();
      postData.append('name','social');
      postData.append('data',JSON.stringify(formValues));

      const token = localStorage.getItem("token");
      // create a new post
      await fetch("/api/social", {
        method: "POST",
        body: postData,
        headers: {
          Authorization: `Bearer ${token}`
            }
          }).then((res) => {
            console.log('dynamic form res', res)
            setFormValues(initialSocial);
            setLoading(false);
            if(res.status === 200){                
                toast.success(`${type} created successfully`);
                if(window) {               
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                }
            } else {
                toast.error('Error creating post');
            }
      });
  
    };
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      debugger
    const { name, value } = e.target;        
    setFormValues({ ...formValues, [name]: value });
    };
  
    return (
        <section className="contact-us" id="contact">
          <div className="row p-6">
            {isLoading ? (
              <div className="text-center w-full py-4">
                <CSpinner color="primary" size="sm" />
              </div>
            ) : (
              <CForm onSubmit={handleSubmit} key={`${type}-form`} className="p-4">
                <>
                  {formFields.map((field, index) => (
                    <div className="mb-3" key={`${index}-${field.type}`}>
                      <CFormInput
                        type={field.type}
                        name={field.name}
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={formValues[field.name] ?? ""}
                        onChange={(e) => handleChange(e)}
                        aria-describedby={`${field.id}-help`}
                      />
                    </div>
                  ))}
      
                  {type === "footer" && (
                    <CCol className="col-12 text-center">
                      <CButton type="submit" color="primary" disabled={loading}>
                        {loading ? (
                          <CSpinner size="sm" variant="grow" />
                        ) : (
                          "Submit"
                        )}
                      </CButton>
                    </CCol>
                  )}
                </>
              </CForm>
            )}
          </div>
        </section>
      );
      
}