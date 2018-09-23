import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { updateNote, deleteNote } from '../../actions/note_actions.js';

class Note extends React.Component {
  constructor(props) {
    super(props);
    const note = this.props.note;
    //load empty values to be filled in componentWillReceiveProps
      this.state = {
        content: "",
        old_content: "",
        content_plain: "",
        title: "",
        old_title: "",
        loaded: false,
      };
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.loadNote = this.loadNote.bind(this, this.props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.makeToolbarDisappear = this.makeToolbarDisappear.bind(this);
    this.makeToolbarAppear = this.makeToolbarAppear.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.currentTarget.value,
    });
  }

  makeToolbarDisappear(){

    const toolbar = document.getElementsByClassName('ql-toolbar')[0];
    toolbar.style.opacity = 0;
    //Make asynchronous so animation effect happens, then we remove the ability
    //To click on the buttons, even though they're invisible
    setTimeout(()=> toolbar.style.display="none", 200);
  }

  makeToolbarAppear(){
    const toolbar = document.getElementsByClassName('ql-toolbar')[0];
    toolbar.style.display= "block";
    //Make asynchronous so we see the animation effect
    setTimeout(() => toolbar.style.opacity = 1, 0);
  }

  componentDidUpdate(prevProps) {

    const note = this.props.note;
    if (!this.state.loaded && note) {
      // I load the data if it's the first time we're loading a note
      this.setState({
        content: note.content,
        old_content: note.content,
        content_plain: note.content_plain,
        title: note.title,
        old_title: note.title,
        loaded: true,
      }, this.setFocus);
    }

    //I also load the data if it's a new note (different id)
    else if (note && prevProps.note && note.id !== prevProps.note.id) {
      this.setState({
        content: note.content,
        old_content: note.content,
        content_plain: note.content_plain,
        title: note.title,
        old_title: note.title,
      }, this.setFocus);
    }
  }

  loadNote(prevProps) {
    const note = this.props.note;
    // I load the data if it's the first time we're loading a note
    if (!this.state.loaded && note) {
      this.setState({
        content: note.content,
        old_content: note.content,
        content_plain: note.content_plain,
        title: note.title,
        old_title: note.title,
        loaded: true,
      });
    }
   }

   //Allows for autofocus in Title Input when New Note, i.e. 'Untitled'
   setFocus() {
     console.log(this.state.content_plain)
     console.log(this.state.title)
     if (this.state.content_plain == "" && this.state.title == "Untitled") {
       const titleInput = document.getElementsByClassName('note-title-input')[0];
       titleInput.focus();
     }
     else {
       //if we're not focused on the titleInput, ensure we can see the toolbar
         this.makeToolbarAppear();
     }
   }

   setUpTitleInput(){
     //grab the title input and quill elements off the DOM
     const titleInput = document.getElementsByClassName('note-title-input')[0];
     const trashIcon = document.getElementsByClassName('note-trash-icon')[0];
     const quill = document.getElementsByClassName('quill')[0];
     //allow the title input to be a child of quill, so we can make quill a grid
     quill.appendChild(titleInput);
     quill.appendChild(trashIcon);
   }

//Autosave happens here
  componentDidMount() {

    this.setUpTitleInput();

    this.loadNote({});

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    //Ensure that focusing on the editor textbox makes the toolbar appear
    const editor = document.getElementsByClassName('ql-editor')[0];
    editor.addEventListener('focus', this.makeToolbarAppear);

    //Save periodically (AUTOSAVE EVERY 3 SECONDS)
    setInterval( () => {
      //Ensures autosave happens for both title and text changes
      if ((this.state.content !== this.state.old_content) || (this.state.title !== this.state.old_title)) {
        //ensure that an autosave won't happen unless new changes occur
        this.setState(
          {
            old_content: this.state.content,
            old_title: this.state.title,
          }, () => {
          update.call(this, this.state.content, this.state.content_plain, this.state.title);
        });
      }
    }, 3000);

    //fire off a Redux action to send the updated note to RAILS
    const update = (content, content_plain, title) => {
      this.props.updateNote(this.props.note.id, content, content_plain, title);
    };
  }


  handleQuillChange(content, delta, source, editor) {
    this.setState(
      { content: content,
        content_plain: editor.getText().trim()
      });
  }

  //To ensure we SAVE before we change the page, if needed
  componentWillUnmount(){
    //fire off a Redux action to send the updated note to RAILS
    const update = (content, content_plain, title) => {
      this.props.updateNote(this.props.note.id, content, content_plain, title);
    };

    //ensure that an save won't happen unless new changes occur
    if ((this.state.content !== this.state.old_content) || (this.state.title !== this.state.old_title)) {
          update.call(this, this.state.content, this.state.content_plain, this.state.title);
      }
  }

  deleteNote(){
    //make sure notes and notebooks are defined
    if (this.props.notebooks && this.props.note) {
      const myNotebook = this.props.notebooks[this.props.note.notebook_id];
      //either our current notebook holds more than one item, or we have multiple
      //notebooks live at the moment
      if (myNotebook.notes.length > 1  || Object.keys(this.props.notebooks).length > 1) {
        this.props.deleteNote(this.props.note.id);
      }
    }
  }

  render () {
    // const toolbar = [
    //   [{ 'font': [] }],
    //   ['italic', 'underline', 'strike'],
    //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //   [{ 'script': 'sub'}, { 'script': 'super' }],
    //   [{ 'indent': '-1'}, { 'indent': '+1' }],
    //   [{ 'direction': 'rtl' }],
    //
    //   [{ 'size': ['small', false, 'large', 'huge'] }],
    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //
    //   [{ 'color': [] }, { 'background': [] }],
    //   [{ 'align': [] }],
    //
    //   ['clean']
    // ];

    const toolbar = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    return (
      <div className="note">
        <ReactQuill value={this.state.content}
                    onChange={this.handleQuillChange}
                    modules={{toolbar}} />
        <input type="text"
               className="note-title-input"
               onChange={this.handleTitleChange}
               value={this.state.title}
               onFocus={this.makeToolbarDisappear}/>
             <img className="note-trash-icon"
                  src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/trash-icon.svg"
                  onClick={this.deleteNote} />
      </div>
    );
  }
}


const mapStateToProps = ( { entities } ) => {
  return {
    notebooks: entities.notebooks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNote: (noteID, content, content_plain, title) => dispatch(updateNote(noteID, content, content_plain, title)),
    deleteNote: (noteID) => dispatch(deleteNote(noteID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
