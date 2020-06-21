import React from 'react';
import { Text, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Movies(props) {


  function renderItem(item){
    return (
      <View>
        <TouchableOpacity onPress={()=>selectItem(item)}>
          <View style={{padding: 10}}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    )
  }

  function selectItem(item){
    props.selectMovie(item)
  }

  if (props.buttonPressed){

    return (      
      <View style={{height: windowHeight*0.6}}>
        {props.moviesError ? (<Text style={{color: 'red'}}>{props.moviesError}</Text>) : (
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10, textAlign: 'center'}}>Best Movies:</Text>
            <FlatList
              data={props.movies}
              renderItem={({item}) => renderItem(item)}
              keyExtractor = {(item, index) => `list-item-${index}`}
            />
          </View>
        )}

      </View>
    );
  }
  else {
    return (<TouchableOpacity onPress={props.getMovies}>
              <View style={{borderWidth: 1, fontSize: 16, padding: 5}}>
                <Text>Movies List</Text>
              </View>
            </TouchableOpacity>)
  }

}