import React from "react";

const Dropdown = ({
	data,
	textProperty,
	valueProperty,
	name,
	label,
	error,
	onChange,
}) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select
				key={name}
				onChange={onChange}
				name={name}
				id={name}
				className="form-control"
			>
				{data.map((item) => (
					<option key={item[valueProperty]}>{item[textProperty]}</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};
Dropdown.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};
export default Dropdown;
