import { connect } from 'react-redux';
import SignUpForm from './signup_form.jsx';
import { signup, googleLogin } from '../../actions/session_actions.js';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //pass a function through props called signup that expects a user argument
    signup: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
