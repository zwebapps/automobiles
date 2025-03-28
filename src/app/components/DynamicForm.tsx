import { CButton, CCol, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormField } from "../common/common";
import { toast } from "react-toastify";
import Editor from "./Editor";

export default function DynamicForm({
  type,
  formFields,
}: {
  type: string;
  formFields: FormField[];
}) {
 
  const [formValues, setFormValues] = useState({} as { [key: string]: string | File });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(formValues).length === 0 || Object.values(formValues).some((val) => !val)) {
         toast.error('All fields are required'); 
         return;      
    }
  
    const postData = new FormData();
    postData.append('type',type);
    formFields.forEach((field) => {
      if (field.type === "file" && field) {
        postData.append('image',formValues[field.name]);
      } else {
        postData.append(`${field.name}`,formValues[field.name]);
      }
    });
    if(type === 'contact'){
      postData.append('editor',formValues['editor']);
    }
    const token = localStorage.getItem("token");
    // create a new post
    await fetch("/api/post", {
      method: "POST",
      body: postData,
      headers: {
        Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          console.log('dynamic form res', res)
          if(res.status === 200){                
              toast.success(`${type} created successfully`);
          } else {
              toast.error('Error creating post');
          }
    });

  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let name = null
    let value = null;
    if (e.target instanceof HTMLInputElement && e.target.files) {
        name = e.target.name
        value = e.target.files[0];
      } else {
        name = e.target.name
        value = e.target.value;
      }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditorChange = (data: object) => {    
    setFormValues({ ...formValues, editor: JSON.stringify(data) });
  }
  return (
    <CForm onSubmit={handleSubmit} key={`${type}-form`}>
      <>
        {formFields && formFields.length > 0 &&
          formFields.map((field, index) => (
            <div className="mb-3" key={`${index}-${field.type}`}>
              {field.type === "textarea" ? (
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
              )}
            </div>
          ))}
          { 
          type === "contact" ? <Editor handleChange={(event: object) => handleEditorChange(event)}/>
          : null
          }
          {
          type !== "Posts" ? <CCol className="col-12 text-center">
                                <CButton type="submit" color="primary">
                                    Submit
                                </CButton>
                                </CCol>
                                : null
            }
        
      </>
    </CForm>
  );
}
