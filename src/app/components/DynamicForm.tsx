'use client';
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CSpinner } from "@coreui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormField } from "../common/common";
import { toast } from "react-toastify";
import EditorComponent from "../components/EditorComponent";
import FreeEditorComponent from "../components/FreeEditorComponent";


export default function DynamicForm({
  type,
  formFields,
}: {
  type: string;
  formFields: FormField[];
}) {
 
  const [formValues, setFormValues] = useState({} as { [key: string]: string | File });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [loading]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    debugger
    setLoading(true);
    e.preventDefault();
    if(Object.values(formValues).length === 0 || Object.values(formValues).some((val) => !val)) {
         toast.error('All fields are required'); 
         setLoading(false);
         return;      
    }
  
    const postData = new FormData();
    postData.append('type',type);
    formFields.forEach((field) => {
      if (field.type === "file" && field) {
        postData.append(`${field.name}`,formValues[field.name]);
      } else {
        postData.append(`${field.name}`,formValues[field.name]);
      }
    });
    const body = Object.fromEntries(postData);
    console.log('body',body)
    if(type === 'contact'){
      postData.append('editor',formValues['editor']);
    }
    const token = localStorage.getItem("token");
    const apiUrl = type === 'listing'? 'car' : 'post';    
    // create a new post
    await fetch(`/api/${apiUrl}`, {
      method: "POST",
      body: postData,
      headers: {
        Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          console.log('dynamic form res', res)
          setFormValues({});
          setLoading(false);
          if(res.status === 200){                
              toast.success(`${type} created successfully`);
              if(window) {               
              setTimeout(() => {
                // window.location.reload();
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
    let name = null
    let value = null;
    if (e.target instanceof HTMLInputElement && e.target.files) {
        name = e.target.name
        value = e.target.files[0];
      } else {
        name = e.target.name
        value = e.target.value;
      }
      console.log([name],":::",value)
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditorChange = (data: unknown) => {    
    setFormValues({ ...formValues, editor: JSON.stringify(data) });
  }
  return (
    <CForm onSubmit={handleSubmit} key={`${type}-form`}>
      <>
        { formFields && formFields.length > 0 &&
          formFields.map((field, index) => (
            <div className="mb-3" key={`${index}-${field.type}`}>
              {field.type === "textarea" && field.name === "description" ? (
                <FreeEditorComponent
                  key={`${index}-${field.type}`}
                  handleChange={(content) => setFormValues({ ...formValues, [field.name]: content })}
                  initialValue={typeof formValues[field.name] === 'string' ? formValues[field.name] as string : field.defaultValue || ""}
                />
              ) : field.type === "textarea" ? (
                <CFormTextarea
                  key={`${index}-${field.type}`}
                  className="mb-3"
                  name={field.name}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  text="Must be 20-30 characters long."
                  onChange={(e) => handleChange(e)}
                  aria-describedby={`${field.id}-help`}
                ></CFormTextarea>
              ) : ( field.type === "color" ? (
                    <CFormInput
                      key={`${index}-${field.type}`}
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      label={field.label}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(e)}
                      text="Must be 8-20 characters long."
                      aria-describedby={`${field.id}-help`}
                      value={typeof formValues[field.name] === 'string' ? formValues[field.name] as string : field.defaultValue || "#000000"}
                    />
                  ) : (
                  <CFormInput
                    key={`${index}-${field.type}`}
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(e)}
                    text="Must be 8-20 characters long."
                    aria-describedby={`${field.id}-help`}
                  />
                ))
              }
            </div>
          ))}
          { 
          type === "contact" ? <EditorComponent handleChange={(event: unknown ) => handleEditorChange(event)}/>
          : null
          }
          {
          type !== "Posts" ? <CCol className="col-12 text-center">
                                <CButton type="submit" color="primary" disabled={loading}>
                                  {loading ?  <CSpinner size="sm" variant="grow" /> : "Submit"}
                                 
                                </CButton>
                                </CCol>
                                : null
            }
        
      </>
    </CForm>
  );
}
