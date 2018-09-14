import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
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

    // this.props.signup({user: this.state});

    //For the first click, when only the email input should be filled
    //Expand form to allow user to input the password
    if (this.state.email !== "" && this.state.password === "") {
      const grid = document.getElementsByClassName('grid-login')[0];

      grid.style.gridTemplateRows = "45px 82px 40px 60px 30px 42px 60px 146px 10px 60px 25px 30px 45px";
      grid.style.gridTemplateAreas =
      `
      " .          .           . "
      " .        logo          . "
      " .      app-name        . "
      " .   positive-message   . "
      " .         .            . "
      " .   googleSignIn       . "
      " .         or           . "
      " .       signup-form    . "
      " .         .            . "
      " .     remember-me      . "
      " .       no-account     . "
      " .        signUp        . ";
      " .         .            . "`;

      const email = document.getElementsByClassName('signup-email-input-login')[0];
      //Blur removes the focus on the input HTML element
      email.blur();

      const password = document.getElementsByClassName('signup-password-input-login')[0];
      password.style.visibility = "visible";
      password.style.opacity = "1";
      // Focus sets the focus (cursor) in the password input field
      // I needed to use an asynchronous method. Unsure why. More pondering
      // Could reveal answers but I am on a time crunch.
      setTimeout(()=> password.focus(), 500);

      //The following styles animate the login card to allow the password button
      //to appear from nothing
      const submit = document.getElementsByClassName('signup-submit-login')[0];
      submit.style.transform = "translateY(0)";

      const rememberMe = document.getElementsByClassName('remember-me')[0];
      rememberMe.style.transform = "translateY(0)";

      const noAccount = document.getElementsByClassName('no-account')[0];
      noAccount.style.transform = "translateY(0)";

      const signUp = document.getElementsByClassName('signUp')[0];
      signUp.style.transform = "translateY(0)";
    }
    //For the second click, email and password boxes should be filled
    else {
      this.props.login({user: this.state});
    }
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

  //Ensures the title of the tab goes back to normal when the user leaves the
  //login form.
  componentWillUnmount() {
    document.title = "MortalNote";
  }

  //Set the title in the tab to match Evernote
  componentDidMount() {
    document.title = "Welcome Back";
  }

  render () {
    //Set the title in the tab to match Evernote
    // document.title="Welcome Back";

    const errors = this.props.errors.map((error, idx) => {
      return <p key={idx}>{error}</p>;
    });
    return (
      <div className="grid-container">
        <div className="grid-login">
          <Link className="logo" to="/">
            <img className="logo"
              src="https://s3.us-east-2.amazonaws.com/mortalnote-images/wolf-logo.png" />
          </Link>
          <h1 className="app-name">MortalNote</h1>
          <p className="positive-message">Remember some things are not important.</p>
          <a href="/auth/google_oauth2" className="googleSignIn" >
            <button className="googleSignIn">
              <img className="google-logo"src="https://s3.us-east-2.amazonaws.com/mortalnote-images/google-logo.png" />
              Continue with Google
            </button>
          </a>
          <div className="or">
            <div className="grey-border" />
            <p className="or-text">or</p>
            <div className="grey-border" />
          </div>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            {errors}
            <input type="text" autoFocus="autoFocus"
              value={this.state.email}
              className="signup-email-input-login signup-email-input"
              onChange={this.handleTyping("email")}
              placeholder="Email address or username" />
            <input type="password"
              value={this.state.password}
              className="signup-password-input-login signup-password-input"
              onChange={this.handleTyping("password")}
              placeholder="Password" />
            <button className ="signup-submit-login signup-submit"> Continue (Sign in) </button>
          </form>
          <p className="remember-me">
            <input type="checkbox" /> Remember me for thirty days
          </p>
          <p className="no-account"> Don't have an account? </p>
          <Link className="signUp" to="/signup">Create account</Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
