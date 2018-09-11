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
      <div className="grid">
        <img className="logo" src="https://i.ytimg.com/vi/EAwWPadFsOA/maxresdefault.jpg" />
        <h1 className="app-name">MortalNote</h1>
        <p className="positive-message">Remember something's are not important.</p>
        <form className="signup-form" onSubmit={this.handleSubmit}>
          {errors}
          <input type="text"
            value={this.state.email}
            onChange={this.handleTyping("email")} />
          <input type="password"
            value={this.state.password}
            onChange={this.handleTyping("password")} />
          <input type="submit" value="Continue (Sign Up)"></input>
        </form>
        <p className="terms-of-service">
          By creating an account, you are agreeing to our terms of service
          and privacy policy.
        </p>
        <p className="already-account"> Already have an account? </p>
        <Link className="signIn" to="/login">Sign in</Link>
      </div>
    );
  }
}

export default SignUpForm;
