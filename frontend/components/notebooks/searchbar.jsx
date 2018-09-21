import React from 'react';
import { connect } from 'react-redux';
import { receiveNotebooksAndNotes, filterNotebooksAndNotes } from '../../actions/notebook_actions.js';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.handleTyping = this.handleTyping.bind(this);
    this.filterSearches = this.filterSearches.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleTyping(e){
    this.setState({searchText: e.target.value}, this.filterSearches);
  }

  filterSearches(){
    const searchText = this.state.searchText;
    // if (this.props.history.location.pathname == "/notes") {
    //   //do nothing, we're on the right page
    // }
    // else {
    //   //switch to the notes page
    //   this.props.history.push('/notes');
    // }
    this.props.filterNotebooksAndNotes(searchText);
  }

  handleFocus(){
    if (this.props.history.location.pathname == "/notes") {
      //do nothing, we're on the right page
    }
    else {
      //switch to the notes page
      this.props.history.push('/notes');
      //Async setTimeout allow the new page to render, so we can find the
      //newly implemnted searchBar input. Then we focus on it to provide the
      //illusion of consistentcy.
      setTimeout(() => {
        const searchBar = document.getElementsByClassName('searchbar-input')[0];
        searchBar.focus();
      }, 0);
    }
  }

  render () {
    const searchIconArray = [
      "https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/search-icon-gray.svg",
      "https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/search-icon-green.svg"
    ];

    //change the searchIcon to a green color when the searchbar is being used
    const searchUrl = (this.state.searchText.length === 0) ? searchIconArray[0] : searchIconArray[1];
    return (
      <div className="searchbar">
        <input type="text"
               className="searchbar-input"
               placeholder="Search all notes..."
               onChange={this.handleTyping}
               value={this.state.searchText}
               onFocus={this.handleFocus}>
        </input>
        <img className="search-icon" src={searchUrl}/>
      </div>
    );
  }
}

const mapStateToProps = ( { entities } ) => {
  return {
    notebooks: entities.notebooks,
    notes: entities.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterNotebooksAndNotes: (searchText) => dispatch(filterNotebooksAndNotes(searchText)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
