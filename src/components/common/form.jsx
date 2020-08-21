import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	handleChange = ({ currentTarget: inputField }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(inputField);

		if (errorMessage) errors[inputField.name] = errorMessage;
		else delete errors[inputField.name];

		const data = { ...this.state.data };
		data[inputField.name] = inputField.value;
		this.setState({ data, errors });
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.joiSchema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const joiSchema = { [name]: this.joiSchema[name] };

		const { error } = Joi.validate(obj, joiSchema);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		this.doSubmit();
	};

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}
}

export default Form;