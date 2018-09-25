
<h1 align="center" font-size="80"> MortalNote </h1>
<p align="center">
  <a href="http://mortal-note.herokuapp.com">
    <img alt="MortalNote Wolf Logo" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/wolf-logo-tiny.png" />
  </a>
</p>

<p align="center">
  MortalNote is an Evernote clone that implements pixel perfect replication and identical, albeit limited, functionality.
</p>

<p align="center">
  MortalNote is the creation of <a href="https://www.linkedin.com/in/brothman7000" > Benji Rothman. </a> 
</p>


## Access
You can [access](http://mortal-note.herokuapp.com/) the site at <http://mortal-note.herokuapp.com>

## Key Features

#### Rich Text Editing

MortalNote implements ReactQuill, a React Component that wraps around the popular Quill.js library. This allows for Rich Text Editing in all of the user's notes. 

#### OAuth Authentication

I utilized the [omniauth-google-oauth2](https://github.com/zquestz/omniauth-google-oauth2) gem to allow users to sign up and login with Google. I secured my Google API Key with the master.key and credentials.yml.enc design pattern built into Rails. 

#### Aesthetically Pleasing CRUD 

MortalNote features modals for CRUD actions -- specifically CREATE -- with notebooks and notes to enhance user experience. I also mapped a DELETE action to a trashcan icon to allow users to intuitively delete notes. 

#### CSS Grid

MortalNote implements CSS Grid technology to enhance the web application's responsiveness. This allows MortalNote to be a more responsive webpage than Evernote. 

## Future Features

#### Optimized Search Algorithim

The Searchbar currently hits the database on each keystroke to fetch all the user's notes and notebooks. I will refactor the application to store all notes and notebooks in a search slice of state. This will remove the need to talk to the database. This allows users to live-filter results by note content and title without firing off queries to the database.

#### Image Uploading

React Quill provides a built-in mechanism for uploading and storing images. I will learn this specific API and implment image uploading in MortalNote.

## How to Sign Up

1. Go to <http://mortal-note.herokuapp.com>.
2. Click 'Sign Up'.
3. Enter your email and password, or continue with Google.

4. You're in! 

## How to Use

1. Replace your first note's title with a title of your choice. 
2. Hit enter and add text to your note's body. 
3. Watch as the application **autosaves** your changes every three seconds.
4. Create a New Note with the **Add Note Button**
5. View your Notebooks by visiting **/notebooks** or by clicking on the Notebooks button on the sidebar. 
6. Create a New Notebook with the **Add Notebook Button**
7. Click on the Newly Created Notebook to automatically generate your first note in that notebook.

8. Repeat! 


## Credits

This software uses code from several open source packages, including the following:

* [React](https://github.com/facebook/react)

* [Redux](https://github.com/reduxjs/redux)

* [Rails](https://github.com/rails/rails)

* [OmniAuth-Google-OAuth2](https://github.com/zquestz/omniauth-google-oauth2)

* [React Quill](https://github.com/zenoamaro/react-quill)
