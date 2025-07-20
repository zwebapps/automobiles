"use client";
import { useState, useRef, useEffect } from 'react';

const FreeEditorComponent = ({ handleChange, initialValue = "" }: { 
  handleChange: (content: string) => void;
  initialValue?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value.toString());
    editorRef.current?.focus();
    updateToolbarState();
    handleContentChange();
  };

  const updateToolbarState = () => {
    if (editorRef.current) {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      handleChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyUp = () => {
    updateToolbarState();
    handleContentChange();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const toolbarButtonStyle = {
    padding: '8px 12px',
    margin: '0 2px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'all 0.2s'
  };

  const activeButtonStyle = {
    ...toolbarButtonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff'
  };

  return (
    <div className="free-editor-container mb-3">
      <label className="form-label">Description</label>
      
      {/* Toolbar */}
      <div 
        style={{
          border: '1px solid #ddd',
          borderBottom: 'none',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px'
        }}
      >
        <button
          type="button"
          style={isBold ? activeButtonStyle : toolbarButtonStyle}
          onClick={() => execCommand('bold')}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        
        <button
          type="button"
          style={isItalic ? activeButtonStyle : toolbarButtonStyle}
          onClick={() => execCommand('italic')}
          title="Italic"
        >
          <em>I</em>
        </button>
        
        <button
          type="button"
          style={isUnderline ? activeButtonStyle : toolbarButtonStyle}
          onClick={() => execCommand('underline')}
          title="Underline"
        >
          <u>U</u>
        </button>
        
        <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 8px' }}></div>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet List"
        >
          • List
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered List"
        >
          1. List
        </button>
        
        <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 8px' }}></div>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('justifyLeft')}
          title="Align Left"
        >
          ←
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('justifyCenter')}
          title="Align Center"
        >
          ↔
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('justifyRight')}
          title="Align Right"
        >
          →
        </button>
        
        <div style={{ width: '1px', backgroundColor: '#ddd', margin: '0 8px' }}></div>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('formatBlock', '<h1>')}
          title="Heading 1"
        >
          H1
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('formatBlock', '<h2>')}
          title="Heading 2"
        >
          H2
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('formatBlock', '<h3>')}
          title="Heading 3"
        >
          H3
        </button>
        
        <button
          type="button"
          style={toolbarButtonStyle}
          onClick={() => execCommand('formatBlock', '<p>')}
          title="Paragraph"
        >
          P
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        style={{
          minHeight: '200px',
          padding: '12px',
          border: '1px solid #ddd',
          borderTop: 'none',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          outline: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          backgroundColor: '#fff'
        }}
        onInput={handleContentChange}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        onBlur={handleContentChange}
      />
      
      <div className="form-text">Format your description with the toolbar above. No API keys or payments required!</div>
    </div>
  );
};

export default FreeEditorComponent; 