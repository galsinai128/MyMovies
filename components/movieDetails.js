import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import {isInFavorites} from '../utils'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function MovieDetails(props) {
  let isFavorite =  isInFavorites(props.favorites,props.movie.title) 
  return (
    <View style={styles.movieDetailsContainer}>
        <TouchableOpacity onPress={props.closeDetails}><Text style={{fontSize: 20}}>{"X"}</Text></TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom: 5 }}>
            <Text style={styles.title}>{props.movie.title}</Text>
            <Image 
                source={{uri: props.selectedMoviePoster}}
                style={{width:100, height: 100}}
            />
        </View>

        <Text style={styles.category}>Overview:</Text>
        <Text>{props.movie.overview}</Text>
        <View style={{flexDirection: 'row',marginTop: 5}}>
            <Text style={styles.category}>Rating:</Text>
            <Text>{props.movie.popularity}</Text>
        </View>
        <TouchableOpacity onPress={()=>props.toggleFavorite(props.movie.title)}>
        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10 }}>{isFavorite ? "Remove From Favorites":"Add To Favorites"}</Text>
        </TouchableOpacity>


    </View>
    
  );

  
}
const styles = StyleSheet.create({
    movieDetailsContainer: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '50%'
    },
    category:{
        fontWeight: 'bold' 
    },
    userImage: {
      width: 50,
      height: 50
    }
})