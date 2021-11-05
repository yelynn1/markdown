import logo from './logo.svg';
import './App.css';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'

function App() {
  const editorRef = useRef(null);
  const initialValue = "Hello ...";
  const [markdown, setMarkdown] = useState(initialValue);
  const [textToCopy, setTextToCopy] = useState(initialValue);
  const [copied, setCopied] = useState("");
  const nhm = new NodeHtmlMarkdown();
   const createMarkdown = () => {
     if (editorRef.current) {
       let contents = editorRef.current.getContent();
       let temp = nhm.translate(contents);
       setTextToCopy(temp);
       setMarkdown(temp.split('\n').map(str => <p>{str}</p>));
       setCopied("");
     }
   };
   async function copyTextToClipboard() {
    setCopied("Copied to Clipboard");
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(textToCopy);
    } else {
      return document.execCommand('copy', true, textToCopy);
    }
   }
  return (
    <>
      <center><h1>Markdown Creator</h1></center>
      <Editor
         apiKey='umb3l00p36tr88g0cruu9dy8w4l8613hfexy248fvae69lap'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={initialValue}
         onChange={createMarkdown}
         init={{
           height: 300,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount image'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic | ' +
           'bullist numlist | ' +
           'image link | ' +
           'insertdatetime | ' +
           'removeformat preview | wordcount paste searchreplace fullscreen | code',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />

       
       <div style={{
         padding: "5px",
       }}>
        <h2>Markdown</h2>
        <button style={{
          backgroundColor: "#207ab7",
          borderRadius: "3px",
          color: "#fff",
          fontSize: "14px",
          padding: "4px 16px",
          lineHeight: "24px",
          border: "none",
          cursor: "pointer"
        }}
        onClick={copyTextToClipboard}
        >Copy</button>
        &nbsp;<small>{copied}</small>
       </div>
       <div style={{
         backgroundColor: '#1D1F21',
         color: '#c5c8c6',
         padding: "15px"
       }}>
         {markdown}
       </div>
       </>
  );
}

export default App;
