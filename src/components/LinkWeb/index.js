import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Feather} from '@expo/vector-icons';

import {WebView} from 'react-native-webview'

export default function LinkWeb({link,title, closeModal}) {
 return (
   <>
   <TouchableOpacity
   style={styles.Botton}
     onPress={closeModal}
   >

    <Feather
      name='x'
      size={20}
      color='#fff'
    />
        <Text style={styles.Titulo} >{title}</Text>
   </TouchableOpacity>
   <WebView
    source={{uri:link}}
   />
   </>
  );
}

const styles = StyleSheet.create({
  Botton:{
     paddingVertical:40,
     paddingHorizontal:18,
     backgroundColor:'#232630',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     marginTop:20,
  },
  Titulo:{
    fontSize:16,
    color:'#fff',

  }
})