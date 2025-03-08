"use client";

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

const Editor = ({handleChange}: {handleChange: object}) => {
  return (
    <div className="editor pb-4">
      <FroalaEditorComponent onModelChange={handleChange} tag='textarea'/>
    </div>
  ) 
};

{/* to display the content view
    <FroalaEditorView
  model={content}
/> */}

export default Editor;
