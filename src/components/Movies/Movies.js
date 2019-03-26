import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import apiKey from '../../api_key/apiKey';

export class Movies extends Component {
  
  constructor() {
    super();
    this.state= {
      favoriteMovies: []
    }
  }

  componentDidMount = () => {
    const { favorites } = this.props
    this.getFavorites(favorites)
  }

  fetchMovie = async (url) => {
    let movieUrl = `${url}${apiKey}&language=en-US`;
    const response = await fetch(movieUrl);
    const movies = await response.json();
    return movies;
  }

  getFavorites = async (favorites) => {
    try {
      let unresolvedFavorites = favorites.map(async (movieID) => {
        const url = `https://api.themoviedb.org/3/movie/${movieID}?`
        const favMovie = await this.fetchMovie(url);
        return favMovie;
      })
      let favoriteMovies = await Promise.all(unresolvedFavorites);
      this.setState({ favoriteMovies })
      console.log(this.state.favoriteMovies)
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { movies, favorites } = this.props;
    console.log(favorites)
    console.log('props in movie component', movies.results)
    const displayRecentMovies = movies.map(movie => (
        <MovieCard {...movie} key={movie.title} />
    ))

    return (
      <div className='movie-container'>
        {displayRecentMovies}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  favorites: state.favorites
})

export default connect(mapStateToProps, null)(Movies);