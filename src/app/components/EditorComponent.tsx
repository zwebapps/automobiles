"use client";
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import dotenv from 'dotenv';
dotenv.config();

const EditorComponent = ({handleChange}: {handleChange: (e: unknown) => void}) => {
  const editorRef = useRef(null);
  const [editorKey, setEdidtorKey] = useState(process.env.TINY_MICE_API_KEY);

  useEffect(() => {
    setEdidtorKey(process.env.TINY_MICE_API_KEY);
  }, [])
  console.log("editorKey", editorKey)
  return (
    <div className="editor pb-4">
      <Editor
        apiKey={editorKey}
        onInit={(_evt, editor) => editorRef.current = editor}
        onEditorChange={handleChange}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  ) 
};

export default EditorComponent;

