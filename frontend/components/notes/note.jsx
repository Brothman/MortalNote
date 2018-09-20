import React from 'react';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/note_actions.js';

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

    const Delta = Quill.import('delta');

    const editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow'
    });

    //so we have access to props inside of load
    const that = this;
    //note is undefined

    //Called only once, on componentDidMount, on first (technically second) render.
    const load = () => {
      //if we have a note, set the editor's content to the note's delta
      if (that.props.note) {
        //Set the note's delta to a variable for cleaner code
        const delta = this.props.note.content;
        //display the note in Rich HTML format
        console.log(`delta: ${delta}`)
        editor.setContents(delta)
        // editor.root.innerHTML = delta;
      }
    }

    //load the note's data
    load();
    // setInterval(()=>load(), 2000)

    //store accumulated changes
    let change = new Delta();

    editor.on('text-change', delta => {
      change = change.compose(delta)
    });

    //Save periodically (AUTOSAVE)
    setInterval( () => {
      if (change.length() > 0) {
        console.log('Saving changes', change);
        console.log(this.props.note)
        update.call(this, change);
        change = new Delta();
      }
    }, 5000);

    //getContents and Set contents are where it's at
    const update = (delta) => {
      //current Rich HTML of our note
      let contents = editor.getContents();
      //SAVE TO DATABASE HERE
      // debugger
      const simpleDelta = delta.ops;
      this.props.updateNote(this.props.note.id, simpleDelta);
    }
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

        <div id="delta-container">
        </div>
      </div>
    );
  }
}



// const mapStateToProps = ( { entities } ) => {
//   return {
//     notes: getAllNotes(entities)
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    updateNote: (noteID, delta) => dispatch(updateNote(noteID, delta)),
  };
};

export default connect(null, mapDispatchToProps)(Note);
