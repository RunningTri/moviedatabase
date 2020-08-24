import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class CreateMovieForm extends Form {
	state = {
		genres: [],
		data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
		errors: {},
	};

	joiSchema = {
		title: Joi.string().required().min(5).max(255).label("Title"),
		genre: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.integer()
			.required()
			.min(1)
			.label("NumberInStock")
			.max(255),
		dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
	};

	doSubmit = () => {
		console.log("Submitted");
		console.log(
			this.state.data,
			this.state.data.genre,
			this.state.data.numberInStock,
			this.state.data.dailyRentalRate,
		);
		const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
		const genreId = "";
		const movie = { title, genre, numberInStock, rate: dailyRentalRate };

		console.log("submittedMovie", movie);
		saveMovie(movie);
		//Send data to server. ...
	};

	componentDidMount() {
		const genres = [...getGenres()];
		this.setState({ genres });
		console.log(genres);
	}

	render() {
		return (
			<div className="container">
				<h1>Create a new Movie</h1>
				<form action="" onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderDropdown("genre", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in stock")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Create New Movie")}
				</form>
			</div>
		);
	}
}

export default CreateMovieForm;
