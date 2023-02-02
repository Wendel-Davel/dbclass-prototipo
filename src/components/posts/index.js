import React from 'react';
import { View,Image,TouchableOpacity,StyleSheet } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native'

export default function posts({data}) {
  const navigation = useNavigation()
  function handleNavigate(){
    navigation.navigate('Detalhes', {id:data?.id, title:data?.attributes?.name, image:data?.attributes?.cover?.data?.attributes?.url})
  }
 return (
   <TouchableOpacity 
   style={styles.post}
   onPress={handleNavigate}
   activeOpacity={0.9}
   >

    <Image 
    style={{width:'100%', height:200, borderRadius:10,}}
    source={{uri:`http://192.168.15.50:1337${data?.attributes?.cover?.data?.attributes?.url}`}} />
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post:{
    width:'100%',
    marginVertical:10,
  }
})