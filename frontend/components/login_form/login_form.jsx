import React from 'react';

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
    this.props.login({user: this.state});
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
      <form onSubmit={this.handleSubmit}>
        {errors}
        <input type="text"
               value={this.state.email}
               onChange={this.handleTyping("email")} />
        <input type="password"
               value={this.state.password}
               onChange={this.handleTyping("password")} />
             <input type="submit" value="Continue (Login)"></input>
      </form>
    );
  }
}

export default LoginForm;
