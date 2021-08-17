import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "./../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: "",
  };
  componentDidMount = () => {
    const genres = [{ _id: "", name: "ALL Generes" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    var movies = [...this.state.movies];
    // console.log(movies === this.state.movies);  False (Cloned Object)
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    let {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered;
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    if (count === 0) {
      return <p>There are no Movies in the Database</p>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemsSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <SearchBox value={searchQuery} onChange={this.handleSearchChange} />
          <p>Showing {totalCount} Movies</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
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
