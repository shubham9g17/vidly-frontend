import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    // Call the Server
    // Redirect to different Page
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmit("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
