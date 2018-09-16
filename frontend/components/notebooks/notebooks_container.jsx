import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions.js';
import Sidebar from './sidebar.jsx';
import NotebookIndex from './notebook_index.jsx';
import { fetchNotebooksAndNotes } from '../../actions/notebook_actions.js';

class NotebooksContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // this.props.fetchNotebooksAndNotes();
    console.log(this.props.fetchNotebooksAndNotes())
  }

  handleLogout() {
    this.props.logout();
      // console.log(this.props.fetchNotebooksAndNotes())
  }

  render() {
    return (
      <div className="notebook-container-grid">
        <Sidebar user={this.props.user}/>
        <NotebookIndex />
        <button className="logout" onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = ( { entities } ) => {
  return {
    user: Object.values(entities.user)[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotebooksAndNotes: () => dispatch(fetchNotebooksAndNotes()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksContainer);
