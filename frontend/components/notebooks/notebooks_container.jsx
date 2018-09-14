import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions.js';

class NotebooksContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render () {
    return (
      <div className="notebook-container-grid">
        <button className="logout" onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(NotebooksContainer);
