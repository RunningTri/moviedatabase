import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 5,
		currentPage: 1,
		sortColumn: {
			sortOption: "title",
			order: "asc",
		},
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPageData() {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies,
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? movies.filter((m) => m.genre._id === selectedGenre._id)
				: movies;

		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.sortOption],
			[sortColumn.order],
		);
		const moviesSelected = paginate(sortedMovies, currentPage, pageSize);

		return {
			amountMovies: filteredMovies.length,
			sortedMovies,
			moviesSelected,
		};
	}

	render() {
		const { length: moviesCount } = this.state.movies;
		const { pageSize, currentPage, sortColumn } = this.state;
		if (moviesCount === 0) return <p>There are no movies in the database.</p>;

		const { amountMovies, moviesSelected } = this.getPageData();

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
					<div className="row align-items-center justify-content-center">
						<Link to="/movies/new" className="btn btn-primary mt-3">
							New Movie
						</Link>
					</div>
				</div>
				<div className="col">
					<p>Showing {amountMovies} movies in the database.</p>
					<MoviesTable
						sortColumn={sortColumn}
						moviesSelected={moviesSelected}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={amountMovies}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
