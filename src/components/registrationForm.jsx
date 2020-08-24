import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegistrationForm extends Form {
	state = {
		data: { username: "", password: "", fullName: "" },
		errors: {},
	};

	joiSchema = {
		fullName: Joi.string().required().label("Fullname"),
		username: Joi.string().required().min(5).label("Username"),
		password: Joi.string().required().min(5).label("Password"),
	};

	doSubmit = () => {
		console.log("Submitted");
		console.log(
			this.state.data.fullName,
			this.state.data.username,
			this.state.data.password,
		);
		//Send data to server. ...
	};

	render() {
		return (
			<div className="container">
				<h1>Registration</h1>
				<form action="" onSubmit={this.handleSubmit}>
					{this.renderInput("fullName", "Fullname")}
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegistrationForm;
