import React from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  handleSubmit(event) {
    //don't refresh the page on submit
    event.preventDefault();

    //login in an object with a key of user, that holds an Object
    //with keys of email and password
    this.props.signup({user: this.state});
  }

  //return a function that will update the state
  handleTyping(field) {
    return (event) => {
      this.setState({
        //brackets interpolate in the value of the variable
        [field]: event.target.value
      });
    };
  }

  render () {
    const errors = this.props.errors.map((error, idx) => {
      return <p key={idx}>{error}</p>;
    });
    return (
      <div className="grid-container">
        <div className="grid">
          <img className="logo" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/wolf-logo.png" />
          <h1 className="app-name">MortalNote</h1>
          <p className="positive-message">Remember some things are not important.</p>
          <button className="googleSignIn">Sign In With Google</button>
          <div className="or">
            <div className="grey-border" />
            <p className="or-text">or</p>
            <div className="grey-border" />
          </div>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            {errors}
            <input type="text" autofocus="autofocus"
              value={this.state.email} 
              className="signup-email-input"
              onChange={this.handleTyping("email")}
              placeholder="Email" />
            <input type="password"
              value={this.state.password}
              className="signup-password-input"
              onChange={this.handleTyping("password")}
              placeholder="Password" />
            <button className ="signup-submit"> Continue (Sign Up) </button>
          </form>
          <p className="terms-of-service">
            By creating an account, you are agreeing to our
            <a className="form-links"
              href="https://evernote.com/legal/terms-of-service"
              target="_blank"> Terms of Service </a>
            and
            <a className="form-links"
               href="https://evernote.com/privacy"
               target="_blank"> Privacy Policy</a>
             .
          </p>
          <p className="already-account"> Already have an account? </p>
          <Link className="signIn" to="/login">Sign in</Link>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
