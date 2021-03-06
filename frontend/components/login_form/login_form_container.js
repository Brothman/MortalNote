import { connect } from 'react-redux';
import LoginForm from './login_form.jsx';
import { login, clearErrors } from '../../actions/session_actions.js';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //pass a function through props called login that expects a user argument
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
