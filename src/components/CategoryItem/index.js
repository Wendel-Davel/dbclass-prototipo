import React from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function CategoryItem({data, favorite}) {
  const navigation = useNavigation();
   
    function handleNavigate(){
      navigation.navigate('Categoria', {id:data?.id, title:data?.attributes?.name})
    } 
  

 return (
   <TouchableOpacity
 
   onPress={handleNavigate}
   style={styles.Container}
   activeOpacity={0.9}
   onLongPress={favorite}
   >
     <Image
     style={styles.Icon}
     source={{uri:`http://192.168.15.50:1337${data?.attributes?.icon?.data?.attributes?.url}`}}
     />
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    borderRadius:8,
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal:2,
  },
  Icon:{
    width:109,
    height:120,
  },
  Name:{
    fontSize:20,

  }
})