import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
	columns = [
		{
			sortOption: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ sortOption: "genre.name", label: "Genre" },
		{ sortOption: "numberInStock", label: "Stock" },
		{ sortOption: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					onClick={() => this.props.onDelete(movie)}
					className="btn btn-danger btn-sm"
				>
					Delete
				</button>
			),
		},
	];
	render() {
		const { moviesSelected, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				data={moviesSelected}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
