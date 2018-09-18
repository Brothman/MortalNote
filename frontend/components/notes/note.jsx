import React from 'react';

class Note extends React.Component {
  componentDidMount() {
    // const toolbarOptions = [
    //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //   ['blockquote', 'code-block'],
    //
    //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //   [{ 'direction': 'rtl' }],                         // text direction
    //
    //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //
    //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //   [{ 'font': [] }],
    //   [{ 'align': [] }],
    //
    //   ['clean']                                         // remove formatting button
    // ];

    const editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow'
    });
  }

  render () {

    return (
      <div className="note">

        <div id="toolbar">

           <select className="ql-size">
             <option value="small"></option>
             <option defaultValue></option>
             <option value="large"></option>
             <option value="huge"></option>
           </select>

           <button className="ql-bold"></button>

           <button className="ql-script" value="sub"></button>
           <button className="ql-script" value="super"></button>
        </div>

        <div id="editor">
          <p className="note-text">Hello World!</p>
        </div>
      </div>
    );
  }
}

export default Note;
