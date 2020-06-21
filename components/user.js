import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import avatar from '../assets/avatar.png'
import Favorites from './favorites'


export default function User(props) {
  return (
    <View style={styles.userContainer}>
        <Text style={styles.title}>{props.name ? 'Welcome ' + props.name + '!' : 'Welcome Stranger!'}</Text>
        <Image source={props.profilePic ?  {uri: props.profilePic.data.url} : avatar} style={styles.userImage}/>
        {!props.email ? <Text style={{marginTop:10}}>Please login to continue to the awesomeness</Text> : null}
        {props.email ? <Favorites favorites={props.favorites}/> : null}

    </View>
    
  );

  
}
const styles = StyleSheet.create({
    userContainer: {
        alignItems:'center',
        marginTop: 50
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
    },
    userImage: {
      width: 50,
      height: 50,
      marginTop: 20
    }
})