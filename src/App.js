import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
	const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=be404d59`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    if(!favourites.includes(movie)){
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      //saveToLocalStorage(newFavouriteList);
    }
	};

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
    setFavourites(newFavouriteList);
    //saveToLocalStorage(newFavouriteList);
	};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);      
       
  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
		setFavourites(movieFavourites);
  }, []); 
  
  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				  <MovieListHeading heading='Movies' />
			  	<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
          <MovieList
            movies={movies} 
            favouriteComponent={AddFavourites}
            handleFavouritesClick={addFavouriteMovie}
            />
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
        <MovieList movies={favourites} 
        					handleFavouritesClick={removeFavouriteMovie}
                  favouriteComponent={RemoveFavourites} 
        />
			</div>

		</div>
	);
};

export default App;