import React from "react";

// INPUT: liked as boolean
// OUTPUT: onClick
// Stateless component for other projects

const Like = (props) => {
	let classes = "fa fa-heart";
	if (!props.liked) classes += "-o";
	return (
		<i
			style={{ cursor: "pointer" }}
			className={classes}
			onClick={props.onClick}
			aria-hidden="true"
		></i>
	);
};

export default Like;
