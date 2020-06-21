import React, { useState }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
} from 'react-native';

import User from './components/user'
import Movies from './components/movies'
import Login from './components/login'
import MovieDetails from './components/movieDetails'

import {isInFavorites} from './utils'
import {getMovies,getPoster} from './api'

const windowHeight = Dimensions.get('window').height;


const App: () => React$Node = () => {
  
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [moviesError, setMoviesError] = useState(null);


  
  function login(data){
    setEmail(data.email);
    setName(data.name);
    setProfilePic(data.picture);
  }

  function logout(){
    setEmail(null);
    setName(null);
    setProfilePic(null);
    setMovies(null);
  }

  function getMoviesDmdb(){
    getMovies()
    .then(res=>{
      setMovies(res.data.results)
      setButtonPressed(true)
    })
    .catch(e=>{
      setMoviesError('error retriving movies')
      setTimeout(()=>{setMoviesError(null)},5000)
    })
  }

  function selectMovie(movie){
    setSelectedMovie(movie);
    getPoster(movie.poster_path)
      .then(res=>{
        setSelectedMoviePoster(res.config.url); 
      })
      .catch(e=>{})
  }

  function closeDetails(){
    setSelectedMovie(null);
    setSelectedMoviePoster(null);
  }

  function toggleFavorite(movieName){
    let inFavorites = isInFavorites(favorites,movieName);
    if (!inFavorites) {
      setFavorites(favorites=> [...favorites,movieName]);
    }
    else {
      let index = favorites.indexOf(inFavorites);
      if (index !== -1) {
        favorites.splice(index, 1);
        setFavorites([...favorites])
      };
    } 
  }
  
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        > */}
        {selectedMovie ? 
          <MovieDetails 
            movie ={selectedMovie}
            closeDetails={closeDetails}
            selectedMoviePoster={selectedMoviePoster}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          /> 
          : (
          <View style={styles.appContainer}>
            <User
              name={name}
              email={email}
              profilePic={profilePic}
              favorites={favorites}
            />


            <View style={styles.login}>
              <Login
                login={data=>{login(data)}}
                logout={logout}
                email={email}
              ></Login>
            </View>
            {email ? (
              <Movies
                email={email}
                movies={movies}
                selectMovie={movie => selectMovie(movie)}
                getMovies={getMoviesDmdb}
                buttonPressed={buttonPressed}
                moviesError={moviesError}
              />
            ) : null}

          </View>
        )}

        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
  },
  login: {
    position: 'absolute',
    top: windowHeight-100,
  }
  
});

export default App;
