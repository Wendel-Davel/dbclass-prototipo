import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity,StyleSheet, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native'

const {width:WIDTH} = Dimensions.get('window')

export default function favoritePost({data}) {
  const navigation = useNavigation()
  function handleNavigate(){
    navigation.navigate('Detalhes', {id:data?.id, title:data?.attributes?.name, image:data?.attributes?.cover?.data?.attributes?.url})
  }
 return (
     <TouchableOpacity 
     style={styles.Container}
     onPress={handleNavigate}
     >
      <ImageBackground
       source={{uri:`http://192.168.15.50:1337${data?.attributes?.cover?.data?.attributes?.url}`}}
       style={styles.cover}
       resizeMode="cover"
       blurRadius={4}
       imageStyle={{borderRadius:6, opacity:0.4}}
      >
      <Text style={styles.Titulo}>{data?.attributes?.title}</Text>
      </ImageBackground>
      
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    marginRight:8,

  },
  cover:{
    borderRadius:10,
    height:100,
    width:WIDTH -60,
    justifyContent:'flex-end',
    backgroundColor:'#232630'
  },
  Titulo:{
    paddingHorizontal:20,
    paddingVertical:10,
    fontSize:13,
    fontWeight:'bold',
    color:'#fff'
  }
})