import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';


export default function Favorites(props) {
  const [isVisible, setVisible] = useState(false);

  function  toggleFavorites(visibility){
    setVisible(visibility)
  }

  function renderItem(item){
    return (
          <View style={{padding: 10}}>
            <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>{item}</Text>
          </View>
    )
  }

  return (
    <View styles={styles.container}>
        <TouchableOpacity onPress={()=>props.favorites && props.favorites.length ? toggleFavorites(true) : null}>
            <Text style={{textDecorationLine: 'underline', marginTop: 10}}>{`You Got ${props.favorites ? props.favorites.length : '0'} Favorites Movies`}</Text>
        </TouchableOpacity>
        <Modal
            backdropOpacity={0.85} 
            isVisible={isVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={()=>toggleFavorites(false)}>
                <Text style={{color: 'white', fontSize: 20}}>X</Text>
            </TouchableOpacity>
            <View>
                <Text style={{color: 'white', fontSize: 20, textAlign:"center"}}>Your Favorites Movies:</Text>
                <FlatList
                    data={props.favorites}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor = {(item, index) => `list-item-${index}`}
                ></FlatList>
            </View>
          </View>
        </Modal>
    </View>
    
  );

  
}
const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row'
    },

})